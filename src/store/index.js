import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db, auth } from "@/firebase/init.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null
  },
  getters: {
    getUsers: state => {
      return state.users;
    },
    currUser: state => {
      if (state.users) {
        return state.users.filter(user => {
          return user.id === auth.currentUser.uid;
        })[0];
      }
      return null;
    }
  },
  mutations: {
    RESET_USER(state, value) {
      state.users = value;
    },
    ...vuexfireMutations
  },
  actions: {
    bindUserRef: firestoreAction(context => {
      // context contains all original properties like commit, state, etc
      // and adds `bindFirestoreRef` and `unbindFirestoreRef`
      // we return the promise returned by `bindFirestoreRef` that will
      // resolve once data is ready
      if (auth.currentUser) {
        return context.bindFirestoreRef("users", db.collection("users"));
      } else {
        context.unbindFirestoreRef("users");
        context.commit("RESET_USER", null);
      }
    })
  },
  modules: {}
});
