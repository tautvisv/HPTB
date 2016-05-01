using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Entity
    {
        [Column(Order = 1)]
        [Key]
        public virtual int Id { get; set; }
    }
}