using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class TravelPointPlan : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public DateTime Duration { get; set; }
        [Required]
        [ForeignKey("PointId")]
        public virtual Point Point { get; set; }
        public int PointId { get; set; }

    }
}