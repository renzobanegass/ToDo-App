using backend.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
    public class TodoControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public TodoControllerTests(WebApplicationFactory<Program> factory)
        {
            var inMemoryFactory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType == typeof(DbContextOptions<TodoDbContext>));
                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    services.AddDbContext<TodoDbContext>(options =>
                    {
                        options.UseInMemoryDatabase("InMemoryDbForTesting");
                    });

                    var sp = services.BuildServiceProvider();
                    using var scope = sp.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
                    db.Database.EnsureCreated();
                });
            });

            _client = inMemoryFactory.CreateClient();
        }

        [Fact]
        public async Task GetTodos_ReturnsSuccessStatusCode()
        {
            var response = await _client.GetAsync("/api/todo");
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task GetTodoById_ReturnsSuccessStatusCode()
        {
            var todo = new Todo { Title = "Test Todo", Description = "Test Description" };
            var postResponse = await _client.PostAsJsonAsync("/api/todo", todo);
            var createdTodo = await postResponse.Content.ReadFromJsonAsync<Todo>();

            var response = await _client.GetAsync($"/api/todo/{createdTodo.Id}");
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task PostTodo_CreatesTodo()
        {
            var todo = new Todo { Title = "Test Todo", Description = "Test Description" };
            var response = await _client.PostAsJsonAsync("/api/todo", todo);

            response.EnsureSuccessStatusCode();
            var createdTodo = await response.Content.ReadFromJsonAsync<Todo>();
            Assert.Equal(todo.Title, createdTodo.Title);
        }

        [Fact]
        public async Task PutTodo_UpdatesTodo()
        {
            var todo = new Todo { Title = "Test Todo", Description = "Test Description" };
            var postResponse = await _client.PostAsJsonAsync("/api/todo", todo);
            var createdTodo = await postResponse.Content.ReadFromJsonAsync<Todo>();

            createdTodo.Title = "Updated Title";

            var putResponse = await _client.PutAsJsonAsync($"/api/todo/{createdTodo.Id}", createdTodo);
            putResponse.EnsureSuccessStatusCode();
            var updatedTodo = await putResponse.Content.ReadFromJsonAsync<Todo>();
            Assert.Equal("Updated Title", updatedTodo.Title);
        }

        [Fact]
        public async Task DeleteTodo_DeletesTodo()
        {
            var todo = new Todo { Title = "Test Todo", Description = "Test Description" };
            var postResponse = await _client.PostAsJsonAsync("/api/todo", todo);
            var createdTodo = await postResponse.Content.ReadFromJsonAsync<Todo>();

            var deleteResponse = await _client.DeleteAsync($"/api/todo/{createdTodo.Id}");
            deleteResponse.EnsureSuccessStatusCode();
        }
    }
}
