using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace randomfilm_backend.Models
{
    /// <summary>
    /// Контекст базы данных фильмов "FilmsDB"
    /// </summary>
    public partial class FilmsDBContext : DbContext
    {
        public FilmsDBContext()
        { }

        public FilmsDBContext(DbContextOptions<FilmsDBContext> options)
            : base(options)
        { }

        public virtual DbSet<Film> Films { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-NMP0LC3\\SQLEXPRESS;Initial Catalog=FilmsDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Film>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Director).HasMaxLength(255);

                entity.Property(e => e.Genre).HasMaxLength(255);

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.Property(e => e.UrlImg).HasMaxLength(255);

                entity.Property(e => e.UrlTrailer).HasMaxLength(255);

                entity.Property(e => e.Year).HasColumnType("date");
            });
        }
    }
}
