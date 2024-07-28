using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using System;

public class TodoService : ITodoService
{
    private readonly TodoDbContext _context;

    public TodoService(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoDTO>> GetAsync() =>
        await _context.Todos.Select(t => new TodoDTO
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            DueDate = t.DueDate,
            IsCompleted = t.IsCompleted,
            Created = t.Created,
            LastUpdated = t.LastUpdated
        }).ToListAsync();

    public async Task<TodoDTO> GetByIdAsync(int id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo != null) 
        {
            var todoDTO = new TodoDTO
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                DueDate = todo.DueDate,
                IsCompleted = todo.IsCompleted,
                Created = todo.Created,
                LastUpdated = todo.LastUpdated
            };

            return todoDTO;
        }

        return null;
    }

    public async Task<TodoDTO> CreateAsync(TodoInsertDTO todoInsertDTO)
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

        return todoDTO;
    }

    public async Task<TodoDTO> UpdateAsync(int id, TodoUpdateDTO todoUpdateDTO)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo != null) 
        {
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

            return todoDTO;
        }

        return null;
    }

    public async Task<TodoDTO> DeleteAsync(int id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo != null)
        {            
            var todoDTO = new TodoDTO
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                DueDate = todo.DueDate,
                IsCompleted = todo.IsCompleted,
                Created = DateTime.UtcNow
            };

            _context.Remove(todo);
            await _context.SaveChangesAsync();

            return todoDTO;
        }

        return null;
    }           
}