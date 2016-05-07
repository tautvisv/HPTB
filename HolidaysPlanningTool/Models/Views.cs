using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class View : Entity, ITravelItem, IUserItem, IDateNow
    {
        [ForeignKey("TravelId")]
        public virtual Travel Travel { get; set; }
        public int TravelId { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}