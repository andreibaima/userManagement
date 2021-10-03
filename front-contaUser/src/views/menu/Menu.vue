<template>
  <v-main style="background-color: #E8EAF6">
    <v-app-bar dark app color="#191970">
      <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title color="white" class="titulo-projeto">User management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="usuario">Bemol-Digital</v-toolbar-title>
    </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="link in links" :key="link.title">
            <v-list-item-icon>
              <v-icon color="black">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <router-link class="itemMenu" :to="link.link">
              {{ link.title }}
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <router-view ></router-view>
  </v-main>
</template>

<script>
const itensLink = [
  {
    title: "Usuários",
    icon: "mdi-account",
    link: "Usuarios",
  },
];

export default {
  name: "Menu",
  data: () => ({
    links: itensLink,
    drawer: false,
    group: null,
  }),

  methods: {
    chamarHome() {
      this.$router.push("/usuario");
    },
    chamarPaciente() {
      this.$router.push("/paciente");
    },
  },
};
</script>

<style scoped>
.itemMenu{
  color: black;
  text-decoration: none;
}
.titulo-projeto {
  font-style: normal;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 100;
  font-size: 22pt;
}
.usuario {
  font-family: 'Courier New', Courier, monospace;
}
</style>