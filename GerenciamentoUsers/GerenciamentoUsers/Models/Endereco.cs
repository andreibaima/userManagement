using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GerenciamentoUsers.Models
{
    public class Endereco
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Cep { get; set; }
        [Required]
        public string Logradouro{ get; set; }
        [Required]
        public string Numero { get; set; }
        [Required]
        public string Bairro { get; set; }
        public string Complemento { get; set; }
        public string Localidade { get; set; }
        public string Uf { get; set; }
        [JsonIgnore]
        public Usuario Usuario { get; set; }
    }
}
