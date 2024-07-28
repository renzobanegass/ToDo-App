using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoController(TodoDbContext todoDbContext)
        {
            _context = todoDbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<TodoDTO>> Get() =>
            await _context.Todos.Select(t => new TodoDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description= t.Description,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                Created = t.Created,
                LastUpdated = t.LastUpdated
            }).ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDTO>> GetById(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            var TodoDTO = new TodoDTO
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                DueDate = todo.DueDate,
                IsCompleted = todo.IsCompleted,
                Created = todo.Created,
                LastUpdated = todo.LastUpdated
            };

            return Ok(TodoDTO);
        }

        [HttpPost]
        public async Task<ActionResult<TodoDTO>> Create(TodoInsertDTO todoInsertDTO)
        {
            var todo = new Todo
            {
                Title = todoInsertDTO.Title,
                Description = todoInsertDTO.Description,
                DueDate = todoInsertDTO.DueDate,
                IsCompleted = todoInsertDTO.IsCompleted,
                Created = DateTime.UtcNow
            };

            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();

            var todoDTO = new TodoDTO
            {
                Id = todo.Id,
                Title = todoInsertDTO.Title,
                Description = todoInsertDTO.Description,
                DueDate = todoInsertDTO.DueDate,
                IsCompleted = todoInsertDTO.IsCompleted,
                Created = DateTime.UtcNow                
            };

            return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todoDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDTO>> Update(int id, TodoUpdateDTO todoUpdateDTO)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            todo.Title = todoUpdateDTO.Title;
            todo.Description = todoUpdateDTO.Description;
            todo.DueDate = todoUpdateDTO.DueDate;
            todo.IsCompleted = todoUpdateDTO.IsCompleted;
            todo.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var todoDTO = new TodoDTO
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                DueDate = todo.DueDate,
                IsCompleted = todo.IsCompleted,
                Created = DateTime.UtcNow
            };

            return Ok(todoDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
