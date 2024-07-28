using backend.DTOs;
using backend.Models;
using backend.Services;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private IValidator<TodoInsertDTO> _todoInsertValidator;
        private IValidator<TodoUpdateDTO> _todoUpdateValidator;
        private ITodoService _todoService;

        public TodoController(TodoDbContext todoDbContext,
            IValidator<TodoInsertDTO> todoInsertValidator,
            IValidator<TodoUpdateDTO> todoUpdateValidator,
            ITodoService todoService)
        {
            _todoInsertValidator = todoInsertValidator;
            _todoUpdateValidator = todoUpdateValidator;
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<IEnumerable<TodoDTO>> Get() =>
            await _todoService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDTO>> GetById(int id)
        {
            var todoDTO  = await _todoService.GetByIdAsync(id);

            return todoDTO == null ? NotFound() : Ok(todoDTO);
        }

        [HttpPost]
        public async Task<ActionResult<TodoDTO>> Create(TodoInsertDTO todoInsertDTO)
        {
            var validationResult = await _todoInsertValidator.ValidateAsync(todoInsertDTO);

            if (!validationResult.IsValid) 
            {
                return BadRequest(validationResult.Errors);
            }                        

            var todoDTO = await _todoService.CreateAsync(todoInsertDTO);

            return CreatedAtAction(nameof(GetById), new { id = todoDTO.Id }, todoDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDTO>> Update(int id, TodoUpdateDTO todoUpdateDTO)
        {
            var validationResult = await _todoUpdateValidator.ValidateAsync(todoUpdateDTO);

            if (!validationResult.IsValid) 
            {
                return BadRequest(validationResult.Errors);
            }                                               

            var todoDTO = await _todoService.UpdateAsync(id, todoUpdateDTO);

            return todoDTO == null ? NotFound() : Ok(todoDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoDTO>> Delete(int id)
        {
            var todoDTO = await _todoService.DeleteAsync(id);

            return todoDTO == null ? NotFound() : Ok(todoDTO);
        }
    }
}
