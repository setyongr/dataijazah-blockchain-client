<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Data Pool</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-data-table :headers="headers" :items="datas" :items-per-page="5" class="elevation-1"></v-data-table>
          </v-card-text>
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Pool",
  data: () => ({
    headers: [
      { text: "Nama", value: "nama" },
      { text: "No Ijazah", value: "noIjazah" },
      { text: "Tingkat Pendidikan", value: "tingkatPendidikan" }
    ],
    datas: [],
    isLoading: false
  }),
  methods: {
    loadData() {
      this.isLoading = true;
      this.datas = [];
      axios
        .get(this.host + "/pool")
        .then(res => {
          res.data.forEach(element => {
            const ijazahData = JSON.parse(element.data);
            this.datas.push(ijazahData);
          });
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.loadData();
  },
  computed: {
    host() {
      return this.$store.state.host;
    }
  }
};
</script>