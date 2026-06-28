using AI.HR.EF.Entities;
using Microsoft.EntityFrameworkCore;

namespace AI.HR.EF.DBContexts
{
    public class AiHrDbContext : DbContext
    {
        public AiHrDbContext(DbContextOptions<AiHrDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>(e =>
            {
                e.HasKey(r => r.RoleId);
                e.Property(r => r.RoleName).IsRequired().HasMaxLength(100);
                e.HasIndex(r => r.RoleName).IsUnique();
            });

            modelBuilder.Entity<User>(e =>
            {
                e.HasKey(u => u.UserId);
                e.Property(u => u.FullName).IsRequired().HasMaxLength(150);
                e.Property(u => u.Email).IsRequired().HasMaxLength(255);
                e.HasIndex(u => u.Email).IsUnique();
                e.Property(u => u.Company).IsRequired().HasMaxLength(150);
                e.Property(u => u.PasswordHash).IsRequired().HasMaxLength(255);

                e.HasOne(u => u.Role)
                 .WithMany(r => r.Users)
                 .HasForeignKey(u => u.RoleId);
            });

            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "HR Manager" },
                new Role { RoleId = 2, RoleName = "HR Executive" },
                new Role { RoleId = 3, RoleName = "Recruiter" },
                new Role { RoleId = 4, RoleName = "Payroll Manager" },
                new Role { RoleId = 5, RoleName = "Team Lead" },
                new Role { RoleId = 6, RoleName = "Developer" },
                new Role { RoleId = 7, RoleName = "Other" }
            );
        }
    }
}
