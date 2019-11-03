using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace randomfilm_backend.Models
{
    public partial class AccountsDBContext : DbContext
    {
        public AccountsDBContext()
        {
        }

        public AccountsDBContext(DbContextOptions<AccountsDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-NMP0LC3\\SQLEXPRESS;Initial Catalog=AccountsDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasName("IX_Account");

                entity.Property(e => e.Id)
                    .HasMaxLength(64)
                    .ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(32);

                entity.Property(e => e.Login).HasMaxLength(32);

                entity.Property(e => e.Password).HasMaxLength(32);

                entity.Property(e => e.RoleId)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Accounts__RoleId__45F365D3");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(32)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(32);
            });
        }
    }
}
