using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class TravelDayPlan : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IList<TravelPointPlan> TravelDays { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("PointId")]
        public Point Point { get; set; }
        public int PointId { get; set; }
        public string ImageUrl { get; set; }
        public int OrderIndex { get; set; }
        public int TravelId { get; set; }

    }
}