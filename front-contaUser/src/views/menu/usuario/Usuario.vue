<template>
  <v-main>
    <v-snackbar :snackbar="snackbar" :color="colorSnackbar" :text="textSnackbar" @fecharDialog="fecharSnackbar"/>
    <v-dialogLoading title="Carregando" :dialog="dialogLoading" />
    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja realmente Excluir o Usuário?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="ExcluirItem">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-dialog v-model="dialogUsuario" persistent min-width="1000" max-width="1000">
      <v-form ref="form"
        v-model="valid"
        lazy-validation>
      <v-card color="">
        <!-- <v-toolbar color="blue" dark> Novo Paciente </v-toolbar> -->
        <v-card-title v-if="!id">Novo Usuário</v-card-title>
        <v-card-title v-else >Alterar Dados do Usuário</v-card-title>
        <v-card-text class="mt-5">
          <v-row class="mtLinha">
            <v-col cols="12" sm="6">
              <label>Nome *</label>
              <v-text-field 
                v-model="usuario.nome" dense placeholder="Digite Seu Nome" outlined
                counter
                maxlength="100"
                :rules="NomesRules"
                required
              >
              </v-text-field>
            </v-col>
             <v-col cols="12" sm="6">
              <label>CPF *</label>
              <v-text-field v-model="usuario.cpf" dense placeholder="Digite Seu CPF" outlined
                v-mask="'###.###.###.##'"
                :rules="[() => (!!usuario.cpf && usuario.cpf.length <= 14) || 'Campo Obrigatório']"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mtLinha">
            <v-col cols="12" sm="3">
              <label>Celular *</label>
              <v-text-field v-model="usuario.fone" dense placeholder="Digite Seu Nº Telefone" outlined
              v-mask="'(##)#####-####'"
              :rules="[() => (!!usuario.fone) || 'Campo Obrigatório']"
              required></v-text-field>
            </v-col>
             <v-col cols="12" sm="5">
              <label>E-mail *</label>
              <v-text-field 
                v-model="usuario.email"  
                dense 
                placeholder="Digite Seu email" 
                outlined
                :rules="emailRules"
                required
                >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <label>CEP *</label>
              <v-text-field 
                v-model="usuario.endereco.cep" 
                dense 
                placeholder="Digite Seu Cep" 
                outlined v-mask="'#####-###'" >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="1">
              <v-btn
                class="mt-5"
                color="secondary"
                fab
                dark
                small
                title="Consulta de CEP (Correios Brasil)"
                @click="consultaCEP"
              >
                <v-icon dark>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="mtLinha">
            <v-col cols="12" sm="6">
              <label>Logradouro *</label>
              <v-text-field v-model="usuario.endereco.logradouro" readonly dense placeholder="Digite o Logradouro" outlined></v-text-field>
            </v-col>
             <v-col cols="12" sm="2">
              <label>Numero *</label>
              <v-text-field 
                v-model="usuario.endereco.numero"
                dense 
                placeholder="Nº Residência" 
                outlined
                required
                 :rules="[() => (!!usuario.endereco.numero && usuario.endereco.numero.length >= 1) || 'Campo Obrigatório']"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <label>Bairro </label>
              <v-text-field v-model="usuario.endereco.bairro" readonly dense placeholder="Bairro" outlined></v-text-field>
            </v-col>
          </v-row>
         <v-row class="mtLinha">
             <v-col cols="12" sm="6">
              <label>Complemento </label>
              <v-text-field v-model="usuario.endereco.complemento" dense placeholder="Digite um Complemento se houver" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <label>Local </label>
              <v-text-field v-model="usuario.endereco.localidade" readonly dense placeholder="Localidade" outlined></v-text-field>
            </v-col>
             <v-col cols="12" sm="3">
              <label>UF </label>
              <v-text-field v-model="usuario.endereco.uf" dense placeholder="Estado" readonly outlined></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="fechardialogUsuario()">Cancelar</v-btn>
          <!-- <v-divider></v-divider> -->
          <v-btn v-if="!id" text color="primary" @click="salvarUsuarios">Salvar</v-btn>
          <v-btn v-else text color="primary" @click="atualizarUsuarios">Alterar</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
    <v-container>
      <v-row class="justify-between">
        <v-col>
          <h3>Usuários</h3>
        </v-col>
        <v-spacer></v-spacer>
        <v-col align="end">
          <v-btn color="success" @click="AdicionarUsuario">
            <v-icon left> mdi-plus </v-icon>Adicionar</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table :headers="headers" :items="itensUsuarios" class="table-header">
            <template v-slot:item.fone="{ item }">
              {{
                formatarFone(item.fone)
              }}
            </template>
            <template v-slot:item.cpf="{ item }">
              {{
                formatarCPF(item.cpf)
              }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2 btn-edit" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon class="btn-del" small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!-- <v-row> -->
    </v-container>
  </v-main>
</template>

<script src="./usuario.js">
</script>

<style>
.table-header th {
  background: #191970 !important;
  color: white !important;
}

.mtLinha {
  margin-top: -25px !important;
}
</style>