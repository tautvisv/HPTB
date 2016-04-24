using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Travel : Entity
    {
        [Required]
        public string Name { get; set; }
        [ForeignKey("StartDayId")]
        public TravelDayPlan StartDay { get; set; }
        public int StartDayId { get; set; }
        [ForeignKey("EndDayId")]
        public TravelDayPlan EndDay { get; set; }
        public int EndDayId { get; set; }
        public IList<TravelDayPlan> WayPoints { get; set; }
        public string ImageUrl { get; set; }
        public string Descrription { get; set; }
        [ForeignKey("AuthorId")]
        public User Author { get; set; }
        [Required]
        public int AuthorId { get; set; }
        //TODO add likes, view oject
        // public int Likes { get; set; }
        // public int Views { get; set; }
        public int CommentsCount { get; set; }
        public IList<Comment> Comments { get; set; }
    }
}