using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class TodoRepository : IRepository<Todo>
    {
        private TodoDbContext _context;

        public TodoRepository(TodoDbContext context) 
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> GetAsync() 
            => await _context.Todos.ToListAsync();

        public async Task<Todo> GetByIdAsync(int id)
            => await _context.Todos.FindAsync(id);

        public async Task CreateAsync(Todo todo)
            => await _context.Todos.AddAsync(todo);

        public void Update(Todo todo)
        {
            _context.Todos.Attach(todo);
            _context.Todos.Entry(todo).State = EntityState.Modified;
        }

        public void Delete(Todo todo)
            => _context.Todos.Remove(todo);
        
        public async Task SaveAsync()
            => await _context.SaveChangesAsync();

    }
}
