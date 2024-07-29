using AutoMapper;
using backend.DTOs;
using backend.Models;
using backend.Repository;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using System;

public class TodoService : ITodoService
{
    private IRepository<Todo> _todoRepository;
    private IMapper _mapper;

    public TodoService(IRepository<Todo> todoRepository,
        IMapper mapper)
    {
        _todoRepository = todoRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TodoDTO>> GetAsync()
    {
        var todos = await _todoRepository.GetAsync();

        return todos.Select(t => _mapper.Map<TodoDTO>(t));
    }

    public async Task<TodoDTO> GetByIdAsync(int id)
    {
        var todo = await _todoRepository.GetByIdAsync(id);

        if (todo != null) 
        {
            var todoDTO = _mapper.Map<TodoDTO>(todo);

            return todoDTO;
        }

        return null;
    }

    public async Task<TodoDTO> CreateAsync(TodoInsertDTO todoInsertDTO)
    {
        var todo = _mapper.Map<Todo>(todoInsertDTO);

        await _todoRepository.CreateAsync(todo);
        await _todoRepository.SaveAsync();

        var todoDTO = _mapper.Map<TodoDTO>(todo);

        return todoDTO;
    }

    public async Task<TodoDTO> UpdateAsync(int id, TodoUpdateDTO todoUpdateDTO)
    {
        var todo = await _todoRepository.GetByIdAsync(id);

        if (todo != null) 
        {
            todo = _mapper.Map<TodoUpdateDTO, Todo>(todoUpdateDTO, todo);            

            _todoRepository.Update(todo);
            await _todoRepository.SaveAsync();

            var todoDTO = _mapper.Map<TodoDTO>(todo);

            return todoDTO;
        }

        return null;
    }

    public async Task<TodoDTO> DeleteAsync(int id)
    {
        var todo = await _todoRepository.GetByIdAsync(id);

        if (todo != null)
        {
            var todoDTO = _mapper.Map<TodoDTO>(todo);

            _todoRepository.Delete(todo);
            await _todoRepository.SaveAsync();

            return todoDTO;
        }

        return null;
    }           
}