using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Point : Entity
    {
        [Required]
        public float Latitude { get; set; }
        [Required]
        public float Longitude { get; set; }
    }
}