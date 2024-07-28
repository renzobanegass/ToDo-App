﻿namespace backend.DTOs
{
    public class TodoUpdateDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? LastUpdated { get; set; }
    }
}
