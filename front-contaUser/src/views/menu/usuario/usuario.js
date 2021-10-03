import axios from "../../../plugins/client.js"
import Snackbar from "../../../components/Snackbar.vue";
import DialogLoading from "../../../components/DialogLoading.vue"

export default {
  components: {
    'v-snackbar': Snackbar,
    'v-dialogLoading': DialogLoading
  },
  data: () => ({
    headers: [
      { text: "Nome", value: "nome" },
      // { text: "Email", value: "email" },
      { text: "Telefone", value: "fone" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    itensUsuarios: [
    ],
    id: "",
    usuario: {
      nome: "",
      fone: "",
      cpf: "",
      email: "",
      endereco: {
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",
        cep: "",
        localidade: "",
        uf: ""
      }
    },
    dialogUsuario: false,
    dialogDelete: false,
    dialogLoading: false,
    snackbar: false,
    textSnackbar: "",
    colorSnackbar: "",
    valid: true,
    emailRules: [
      v => !!v || 'Campo Obrigatório',
      v => /.+@.+\..+/.test(v) || 'E-mail Não é valido',
    ],
    NomesRules: [
      v => !!v || 'Campo Obrigatório',
      v => (v && v.length >= 6) || 'Nome não pode ser menor que 6 caracteres',
    ],
  }),
  methods: {
    editItem(item) {
      this.id = item.id
      this.dialogUsuario = true;
      this.usuario = JSON.parse(JSON.stringify(item));
      // this.preencherDados(itemUsuario);
      // this.usuario = item;
      // return item;
    },
    deleteItem(item) {
      this.id = item.id;
      this.dialogDelete = true
    },
    AdicionarUsuario() {
      this.id = "";
      this.limparCampos();
      if (this.$refs.form != undefined) {
        this.$refs.form.resetValidation()
      }

      this.dialogUsuario = true;
    },
    carregarUsuarios() {
      this.dialogLoading = true
      axios.get("Usuario")
        .then(resposta => {
          this.itensUsuarios = resposta.data
          // console.log(resposta.data)
          this.dialogLoading = false
        }).catch(e => {

          console.log(e)
          this.msgErro("Erro ao carregar Dados");
          this.dialogLoading = false
        })
    },
    validarCampos() {
      if (this.usuario.nome == "" || this.usuario.nome.length > 100) {
        this.msgErro("Campo Nome não pode ser vazio e maior que 100 caracteres")
        return true;
      }
      if (this.usuario.cpf == "" || this.usuario.cpf.length > 13) {
        this.msgErro("Campo CPF está vazio ou inválido.")
        return true;
      } else if (
        this.usuario.cpf != "" ||
        this.usuario.cpf != null ||
        this.usuario.cpf != undefined
      ) {
        let cpf = this.usuario.cpf;
        cpf = cpf.replace(/[^\d]+/g, "");
        if (!this.validaCPF(cpf)) {
          this.msgErro("O CPF informado é inválido. Digite um CPF válido.");
          return true;
        }
      }
    },
    validaCPF(cpf) {
      let numeros, digitos, soma, i, resultado, digitosIguais;
      digitosIguais = 1;
      if (cpf.length < 11) return false;
      for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
          digitosIguais = 0;
          break;
        }
      if (!digitosIguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) return false;
        return true;
      } else return false;
    },


    salvarUsuarios() {
      // this.$refs[`form`][0].validate()
      let fone = this.usuario.fone;
      this.usuario.fone = fone.replace(/[^\d]+/g, "");
      let cpf = this.usuario.cpf;
      this.usuario.cpf = cpf.replace(/[^\d]+/g, "");
      // this.usuario.endereco.cep = parseInt(this.usuario.endereco.cep.toString());
      // console.log(this.$refs.form.validate())
      if (this.$refs.form.validate()) {
        if (this.validarCampos()) {
          console.log("erro")
        } else {
          axios.post("Usuario", this.usuario)
            .then(resposta => {
              console.log(resposta)
              this.msgSucesso("Usuário Salvo com Sucesso")
              // this.limparCampos();
              console.log(this.$refs.form.resetValidation());
              this.dialogUsuario = false
              this.carregarUsuarios();
            })
            .catch(e => {
              console.log(e)
            })
        }
      }
    },
    preencherDados(item){
      this.usuario.nome =  item.nome;
        this.usuario.fone = item.fone;
        this.usuario.cpf = item.cpf;
        this.usuario.email = item.email;
          this.usuario.endereco.logradouro = item.endereco.logradouro;
          this.usuario.endereco.numero = item.endereco.numero;
          this.usuario.endereco.bairro = item.endereco.bairro;
          this.usuario.endereco.complemento = item.bairro.complemento;
          this.usuario.endereco.cep = item.endereco.cep;
          this.usuario.endereco.localidade = item.endereco.localidade;
          this.usuario.endereco.uf = item.endereco.uf;
    },
    formatarFone(item) {
     return item.replace(/(\d{2})(\d{5})(\d{4})/, function(
        regex,
        arg1,
        arg2,
        arg3
      ) {
        return "(" + arg1 + ")" + arg2 + "-" + arg3;
      })
    },
    formatarCPF(item) {
      return item.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, function(
         regex,
         arg1,
         arg2,
         arg3,
         arg4,
       ) {
         return arg1 + "." + arg2 + "." + arg3 + "-" + arg4;
       })
     },
    atualizarUsuarios() {
      let fone = this.usuario.fone;
      this.usuario.fone = fone.replace(/[^\d]+/g, "");
      let cpf = this.usuario.cpf;
      this.usuario.cpf = cpf.replace(/[^\d]+/g, "");
      if (this.$refs.form.validate()) {
        if (this.validarCampos()) {
          console.log("erro")
        } else {
          axios.put("Usuario/" + this.id, this.usuario)
            .then(resposta => {
              console.log(resposta)
              this.msgSucesso("Alterado com Sucesso")
              this.dialogUsuario = false;
              this.carregarUsuarios();
            })
            .catch(e => {
              console.log(e)
              this.carregarUsuarios()
              this.msgErro("Erro ao Alterar Dados")
            })
        }
      }
    },
    ExcluirItem() {
      axios.delete("Usuario/" + this.id)
        .then(resposta => {
          console.log(resposta)
          this.carregarUsuarios()
          this.dialogDelete = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    consultaCEP() {
      let cep = this.usuario.endereco.cep
      cep = cep.replace(/[^\d]+/g, "");

      // let endereco = {};
      console.log(cep);
      // return
      axios.get("Usuario/buscaCep/" + cep)
        .then(resposta => {
          if(resposta.data.cep == null){
            this.msgErro("CEP não encontrado")
          }
          console.log(resposta)
          this.usuario.endereco.logradouro = resposta.data.logradouro;
          this.usuario.endereco.bairro = resposta.data.bairro;
          this.usuario.endereco.localidade = resposta.data.localidade;
          this.usuario.endereco.uf = resposta.data.uf;
        })
        .catch(e => {
          console.log(e)
        })

      // this.$emit("showLoading", true);

    },
    msgErro(msg) {
      let text = msg;
      let color = "#b71c1c"
      this.snackbarDialog(true, text, color)
    },
    msgSucesso(msg) {
      let text = msg;
      let color = "#1b5e20";
      this.snackbarDialog(true, text, color)
    },
    fecharSnackbar() {
      this.snackbar = false;
    },
    fechardialogUsuario() {
      this.dialogUsuario = false;
      this.limparCampos();
    },
    snackbarDialog(visible, text, color) {
      this.snackbar = visible,
        this.textSnackbar = text;
      this.colorSnackbar = color;
    },
    limparCampos() {
      this.usuario = {
        nome: "",
        fone: "",
        cpf: "",
        endereco: {
          rua: "",
          numero: "",
          bairro: "",
          complemento: "",
          cep: ""
        }
      }
    }
  },
  mounted() {
    this.carregarUsuarios()
  },
};