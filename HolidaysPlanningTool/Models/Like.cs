using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public enum LikeStatuses
    {
        Neultral = 0,
        Dislike = -1,
        Like = 1
    }

    public interface ITravelItem
    {
        [ForeignKey("TravelId")]
        int TravelId { get; set; }
    }
    public interface IUserItem
    {
        [ForeignKey("UserId")]
        string UserId { get; set; }
    }
    public interface IDateNow
    {
        DateTime Date { get; set; }
    }
    public class Like: Entity, ITravelItem, IUserItem, IDateNow 
    {
        [ForeignKey("TravelId")]
        public virtual Travel Travel { get; set; }
        public int TravelId { get; set; }
        public LikeStatuses Status { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}
