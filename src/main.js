import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    host: "",
    isHostSet: false
  },
  mutations: {
    setHost (state, host) {
      state.host = host
    },
    setHostSet (state, value) {
      state.isHostSet = value
    },
    
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
