using GerenciamentoUsers.Models;
using GerenciamentoUsers.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoUsers.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository _repositorio;

        public UsuarioController(IUsuarioRepository repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IEnumerable<Usuario> recuperarUsuarios()
        {
            return _repositorio.ListarUsuarios();
        }

        [HttpPost]
        public IActionResult AdicionarUsuario([FromBody] Usuario usuario)
        {
            _repositorio.Adicionar(usuario);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarUsuario(int id, [FromBody] Usuario usuarioNovo)
        {
            var usuario = _repositorio.ObterPorId(id);
            if (usuario == null)
            {
                return NotFound();
            }
            usuario.Nome = usuarioNovo.Nome;
            usuario.Cpf = usuarioNovo.Cpf;
            usuario.Fone = usuarioNovo.Fone;
            usuario.email = usuarioNovo.email;
            usuarioNovo.Endereco.Id = usuario.Endereco.Id;
            usuario.Endereco = usuarioNovo.Endereco;
            _repositorio.Alterar(usuario);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult RecuperarUsuarioId(int id)
        {
            var usuario = _repositorio.ObterPorId(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarUsuario(int id)
        {
            var usuario = _repositorio.ObterPorId(id);
            if (usuario == null)
            {
                return NotFound();
            }
            _repositorio.RemoverUsuario(usuario);
            return Ok();
        }

        [HttpGet("buscaCep/{codCep}")]
        public Endereco GetConsultaCEPCorreios(string codCep)
        {
            return _repositorio.BuscaCep(codCep);
        }
    }
}
