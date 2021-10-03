using GerenciamentoUsers.Data;
using GerenciamentoUsers.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace GerenciamentoUsers.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private UserContext _context;
        private readonly IConfiguration _config;

        HttpClient consultaCEP;
        Uri enderecoUri;

        public UsuarioRepository(UserContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public void Adicionar(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
        }

        public void Alterar(Usuario usuario)
        {
 
            _context.Usuarios.Update(usuario);
            _context.SaveChanges();
        }

        public IEnumerable<Usuario> ListarUsuarios()
        {
            var user = _context.Usuarios.Include(p => p.Endereco);
            return user;
        }

        public Usuario ObterPorId(int id)
        {
            Usuario usuario = _context.Usuarios.Include(p => p.Endereco).AsNoTracking().FirstOrDefault(p => p.Id == id);
            return usuario;
        }

        public void RemoverUsuario(Usuario usuario)
        {
            _context.Remove(usuario);
            _context.SaveChanges();
        }

        public Endereco BuscaCep(string cep)
        {

            consultaCEP = new HttpClient(); 

            string conexao = _config.GetSection("CepCorreios:path").Value.ToString();

            consultaCEP.BaseAddress = new Uri(conexao);

            consultaCEP.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = consultaCEP.GetAsync(cep + "/json/").Result;

            if (response.IsSuccessStatusCode) 
            {
                enderecoUri = response.Headers.Location;

                var enderecoJson = response.Content.ReadAsStringAsync();

                Endereco enderecoModel = JsonConvert.DeserializeObject<Endereco>(enderecoJson.Result);

                return enderecoModel;
            }
            else
            {
                return null;
            }

        }
    }
}
