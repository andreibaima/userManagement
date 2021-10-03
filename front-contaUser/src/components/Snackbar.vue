<template>
  <div class="text-center">
    <v-snackbar :color="color" v-model="snackbar" :timeout="finalizar()">
      {{ text }}
      <!-- @click="snackbar = false" -->
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="fecharSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    text: String,
    color: String,
    snackbar: Boolean,
  },

  data: () => ({
    timeout: 4000,
  }),

  methods: {
    fecharSnackbar: function () {
      this.$emit("fecharDialog");
    },

    finalizar: function () {
        setTimeout(() => {
            this.$emit("fecharDialog")
        }, this.timeout)
    }
  },
});
</script>