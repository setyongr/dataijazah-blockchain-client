<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="hostInput" label="Add Host" required></v-text-field>
              </v-col>
              <v-col>
                <v-btn color="success" class="mr-4" @click="addHost">Add</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Node Host</v-toolbar-title>
            <v-spacer />
            <v-btn color="warning" class="mr-4" @click="clearHost">Clear Host</v-btn>
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
  name: "Host",
  data: () => ({
    headers: [{ text: "Host", value: "host" }],
    datas: [],
    isLoading: false,
    hostInput: ""
  }),
  methods: {
    loadData() {
      this.isLoading = true;
      this.datas = [];
      axios
        .get(this.host + "/peer")
        .then(res => {
          this.datas = res.data.hosts.map(data => ({
            host: data
          }));
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addHost() {
      this.isLoading = true;
      this.datas = [];
      axios
        .post(this.host + "/peer/add", {
          host: this.hostInput
        })
        .then(res => {
          this.datas = res.data.hosts.map(data => ({
            host: data
          }));
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    clearHost() {
      this.isLoading = true;
      this.datas = [];
      axios
        .post(this.host + "/peer/clear", {})
        .then(res => {
          this.datas = res.data.hosts.map(data => ({
            host: data
          }));
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