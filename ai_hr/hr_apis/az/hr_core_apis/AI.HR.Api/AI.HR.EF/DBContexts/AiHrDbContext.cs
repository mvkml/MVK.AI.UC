using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AI.HR.EF.DBContexts
{
    public class AiHrDbContext : DbContext
    {
        public AiHrDbContext(DbContextOptions<AiHrDbContext> options) : base(options) { }

        //public DbSet<Employee> Employees => Set<Employee>();
    }
}
