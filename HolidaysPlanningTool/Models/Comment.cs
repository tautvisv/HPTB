using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Comment : Entity
    {
        [Required]
        public DateTime Date { get; set; }
        [ForeignKey("AuthorId")]
        public User Author { get; set; }
        [Required]
        public int AuthorId { get; set; }
        [Required]
        public string Text { get; set; }
    }
}