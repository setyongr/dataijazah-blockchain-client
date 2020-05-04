<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Tambah Data</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="nama" label="Nama" required></v-text-field>
              <v-text-field v-model="noIjazah" label="Nomor Ijazah" required></v-text-field>
              <v-text-field v-model="tingkatPendidikan" label="Tingkat Pendidikan" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Informasi</v-card-title>
        <v-card-text>{{dialogMessage}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Oke</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Input",
  data: () => ({
    nama: "",
    noIjazah: "",
    tingkatPendidikan: "",
    isLoading: false,
    dialog: false,
    dialogMessage: ""
  }),
  methods: {
    reset() {
      this.nama = "";
      this.noIjazah = "";
      this.tingkatPendidikan = "";
    },
    submit() {
      this.isLoading = true;
      axios
        .post(this.host + "/add", {
          data: JSON.stringify({
            nama: this.nama,
            noIjazah: this.noIjazah,
            tingkatPendidikan: this.tingkatPendidikan
          })
        })
        .then(() => {
          this.isLoading = false;
          this.reset();
          this.dialog = true;
          this.dialogMessage = "Sukses Menambah Data";
        })
        .catch(() => {
          this.isLoading = false;
          this.dialog = true;
          this.dialogMessage = "GAGAL Menambah Data";
        });
    }
  },
  mounted() {
    this.reset();
  },
  computed: {
    host() {
      return this.$store.state.host;
    }
  }
};
</script>