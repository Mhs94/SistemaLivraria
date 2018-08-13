namespace LivrariaRepository
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using LivrariaDomain;
    public partial class LivrariaData : DbContext
    {
        public LivrariaData()
            : base("name=LivrariaData")
        {
        }

        public virtual DbSet<Livro> Livro { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Livro>()
                .Property(e => e.titulo)
                .IsUnicode(false);

            modelBuilder.Entity<Livro>()
                .Property(e => e.editora)
                .IsUnicode(false);

            modelBuilder.Entity<Livro>()
                .Property(e => e.autor)
                .IsUnicode(false);
        }
    }
}
