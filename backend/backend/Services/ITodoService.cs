using backend.DTOs;

namespace backend.Services
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoDTO>> GetAsync();
        Task<TodoDTO> GetByIdAsync(int id);
        Task<TodoDTO> CreateAsync(TodoInsertDTO todoInsertDTO);
        Task<TodoDTO> UpdateAsync(int id, TodoUpdateDTO todoUpdateDTO);
        Task<TodoDTO> DeleteAsync(int todoId);
    }
}
