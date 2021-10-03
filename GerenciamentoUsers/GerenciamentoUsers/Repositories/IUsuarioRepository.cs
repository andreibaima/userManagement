using GerenciamentoUsers.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoUsers.Repositories
{
    public interface IUsuarioRepository
    {
        void Adicionar(Usuario usuario);
        void Alterar(Usuario usuario);
        IEnumerable<Usuario> ListarUsuarios();
        Usuario ObterPorId(int id);
        void RemoverUsuario(Usuario usuario);
        Endereco BuscaCep(string cep);
    }
}
