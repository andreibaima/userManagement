using GerenciamentoUsers.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoUsers.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> opt) : base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Endereco>().ToTable("Enderecos");
            modelBuilder.Entity<Endereco>().Property<int>("UsuarioId");
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
