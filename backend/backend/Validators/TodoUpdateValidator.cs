using backend.DTOs;
using FluentValidation;

namespace backend.Validators
{
    public class TodoUpdateValidator : AbstractValidator<TodoUpdateDTO>
    {
        public TodoUpdateValidator()
        {
            RuleFor(x => x).NotEmpty().WithMessage("The {PropertyName} is required");
            RuleFor(x => x.Title).NotEmpty().WithMessage("The {PropertyName} is required");
            RuleFor(x => x.Title).Length(2, 20).WithMessage("The {PropertyName} must be between 2 and 20 characters long");
            RuleFor(x => x.Description).NotEmpty().WithMessage("The {PropertyName} is required");
        }
    }
}
