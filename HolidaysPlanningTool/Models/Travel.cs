using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Models
{
    public class Travel : Entity
    {
        [Required]
        public string Name { get; set; }
        [ForeignKey("StartDayId")]
        public virtual TravelDayPlan StartDay { get; set; }
        public int? StartDayId { get; set; }
        [ForeignKey("EndDayId")]
        public virtual TravelDayPlan EndDay { get; set; }
        public int? EndDayId { get; set; }
        public virtual IList<TravelDayPlan> WayPoints { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        [ForeignKey("AuthorId")]
        public virtual User Author { get; set; }
        [Required]
        public string  AuthorId { get; set; }
        //TODO add likes, view oject
        // public int Likes { get; set; }
        // public int Views { get; set; }
        [NotMapped]
        public int CommentsCount { get; set; }
        public virtual IList<Comment> Comments { get; set; }
    }
}