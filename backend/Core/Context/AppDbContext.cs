
using Microsoft.EntityFrameworkCore;
using backend.Core.Entities;

namespace backend.Core.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Applicant> Applicants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships and constraints if needed
            // modelBuilder.Entity<Company>()
            //     .HasOne(c => c.Jobs)
            //     .WithOne(j => j.Company)
            //     .HasForeignKey(j => j.CompanyId);

            modelBuilder.Entity<Job>()
                .HasOne(j => j.Company)
                .WithMany(c => c.Jobs)
                .HasForeignKey(j => j.CompanyId);

            modelBuilder.Entity<Applicant>()
                .HasOne(a => a.Job)
                .WithMany(j => j.Applicants)
                .HasForeignKey(a => a.JobId);
        }
    }
}