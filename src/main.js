import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "@/firebase/init.js";
import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
    store.dispatch("bindUserRef"); // SET OR RESET USER
    // SET IF ONLINE : RESET IF OFFLINE
    Vue.use(firestorePlugin);
  }
});
