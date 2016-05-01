using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Models
{
    public class User : Author
    {
        [NotMapped]
        public new int Id { get; set; }
        [JsonIgnore]
        [Index(IsUnique = true)]
        [Column(Order = 2)]
        [Key]
        [Required]
        public string UserId { get; set; }
        public string Address { get; set; }
        [MaxLength(128)]
        [Index(IsUnique = true)]
        public string Email { get; set; }
        public string Description { get; set; }
        public string Phone { get; set; }
        public string ExtraInfo { get; set; }
    }
    public class Author : Entity
    {
        [Required]
        [Index(IsUnique = true)]
        public string Username { get; set; }
        [MaxLength(128)]
        public string Name { get; set; }
        [MaxLength(128)]
        public string Surname { get; set; }
        public string ImageUrl { get; set; }
    }


    //TODO patikrinti ar naudojama tai
    //public class UserLocation : Entity
    //{
    //    public string Name { get; set; }
    //    public string Description { get; set; }
    //    public Point Point { get; set; }
    //}
}