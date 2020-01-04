﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

using randomfilm_backend.Models;

namespace randomfilm_backend
{
    public partial class FilmsDBContext : DbContext
    {
        public FilmsDBContext()
        {
        }

        public FilmsDBContext(DbContextOptions<FilmsDBContext> options)
            : base(options)
        { }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Film> Films { get; set; }
        public virtual DbSet<FilmsGenres> FilmsGenres { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<Role> Roles { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.Property(e => e.Email).HasMaxLength(32);

                entity.Property(e => e.Login).HasMaxLength(32);

                entity.Property(e => e.Password).HasMaxLength(32);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Accounts");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Comments__Accoun__0D7A0286");

                entity.HasOne(d => d.Film)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.FilmId)
                    .HasConstraintName("FK__Comments__FilmId__0C85DE4D");
            });

            modelBuilder.Entity<Film>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description).HasMaxLength(4000);

                entity.Property(e => e.Director).HasMaxLength(255);

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.Property(e => e.UrlImg).HasMaxLength(255);

                entity.Property(e => e.UrlTrailer).HasMaxLength(255);

                entity.Property(e => e.Year).HasColumnType("date");
            });

            modelBuilder.Entity<FilmsGenres>(entity =>
            {
                entity.ToTable("Films&Genres");

                entity.HasOne(d => d.Film)
                    .WithMany(p => p.FilmsGenres)
                    .HasForeignKey(d => d.FilmId)
                    .HasConstraintName("FK_FilmsGenre_ToFilms");

                entity.HasOne(d => d.Genre)
                    .WithMany(p => p.FilmsGenres)
                    .HasForeignKey(d => d.GenreId)
                    .HasConstraintName("FK_FilmsGenres_ToGenres");
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Likes");

                entity.HasOne(d => d.Film)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.FilmId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Likes__FilmId__7F2BE32F");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(32);
            });
        }
    }
}
