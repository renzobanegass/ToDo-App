using backend.Automappers;
using backend.DTOs;
using backend.Models;
using backend.Repository;
using backend.Services;
using backend.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
{ 
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    //Services
    builder.Services.AddScoped<ITodoService, TodoService>();

    //Repository
    builder.Services.AddScoped<IRepository<Todo>, TodoRepository>();

    // Entity Framework
    builder.Services.AddDbContext<TodoDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("TodoConnection")));

    // Validators
    builder.Services.AddScoped<IValidator<TodoInsertDTO>, TodoInsertValidator>();
    builder.Services.AddScoped<IValidator<TodoUpdateDTO>, TodoUpdateValidator>();

    //Mappers
    builder.Services.AddAutoMapper(typeof(MappingProfile));

    builder.Services.AddCors(o => o.AddPolicy("policy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    }));
}


var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    if (!app.Environment.IsEnvironment("Testing"))
    {
        app.UseHttpsRedirection();
    }

    app.UseCors("policy");
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

public partial class Program { }