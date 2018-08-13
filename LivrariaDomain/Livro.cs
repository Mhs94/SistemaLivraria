using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
namespace LivrariaDomain
{
    [Table("Livro")]
    public partial class Livro
    {
        [Key]
        public int cod { get; set; }

        [Required]
        [StringLength(50)]
        public string titulo { get; set; }

        [Required]
        [StringLength(50)]
        public string editora { get; set; }

        [Required]
        [StringLength(50)]
        public string autor { get; set; }

        public int anoPublicacao { get; set; }

        public int? numeroPaginas { get; set; }
    }
}
