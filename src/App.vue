<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isHostSet" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-row align="center">
            <v-col cols="6 ma-3">
              <h2>Host: {{ host }}</h2>
            </v-col>
          </v-row>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Data Ijazah Block Chain</span>
      </v-toolbar-title>
      <v-spacer />    
    </v-app-bar>
    <v-content>
      <div v-if="isHostSet">
        <router-view></router-view>
      </div>
      <div v-else>
        <v-container>
          <v-row align="center" class="ma-5">
            <v-col cols="12">
              <v-form>
                <v-text-field v-model="host" label="Set Host" required></v-text-field>
                <v-btn color="success" class="mr-4" @click="setHost">Submit</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-contacts", text: "Input" },
      { icon: "mdi-history", text: "Data" },
      { icon: "mdi-history", text: "Pool" },
      { icon: "mdi-history", text: "Host" }
    ],
    host: "",
  }),
  methods: {
    setHost() {
      this.$store.commit('setHost', this.host)
      this.$store.commit('setHostSet', true)
      console.log(this.$store.state)
    }
  },
  computed: {
    isHostSet() {
      return this.$store.state.isHostSet
    }
  }
};
</script>