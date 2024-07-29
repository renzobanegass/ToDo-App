using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Automappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<TodoInsertDTO, Todo>()
                .ForMember(t => t.Created, opt => opt.MapFrom(src => DateTime.Now));

            CreateMap<Todo, TodoDTO>();

            CreateMap<TodoUpdateDTO, Todo>()
                .ForMember(t => t.LastUpdated, opt => opt.MapFrom(src => DateTime.Now)); ;
        }
    }
}
