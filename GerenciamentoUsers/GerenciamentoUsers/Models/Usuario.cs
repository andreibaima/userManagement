using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoUsers.Models
{
    public class Usuario
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Cpf { get; set; }
        [Required]
        public string Fone { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public Endereco Endereco { get; set; }
    }
}
