<template>
  <v-container>
    <v-row class="ma-5">
      <h1>Selamat Datang</h1>
    </v-row>
    <v-row class="ma-5">
      <h3>Anda terkoneksi ke {{ host }}</h3>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  computed: {
    host() {
      return this.$store.state.host
    }
  }
};
</script>