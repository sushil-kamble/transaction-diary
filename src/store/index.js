import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db, auth } from "@/firebase/init.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    transfer: null,
    makeNull: null
  },
  getters: {
    getUsers: state => {
      return state.users;
    },
    transfer: state => {
      return state.transfer;
    },
    getMakeNull: state => {
      return state.makeNull;
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
        context.dispatch("bindTransactions");
        context.dispatch("bindMakeNullRequestTo");
        return context.bindFirestoreRef("users", db.collection("users"));
      } else {
        context.unbindFirestoreRef("users");
        context.commit("RESET_USER", null);
        return null;
      }
    }),
    bindTransactions: firestoreAction(context => {
      if (auth.currentUser) {
        return context.bindFirestoreRef(
          "transfer",
          db
            .collection("transfer")
            .where("transaction", "array-contains", auth.currentUser.uid)
            .orderBy("timestamp", "desc")
        );
      } else {
        context.unbindFirestoreRef("transfer");
        context.commit("RESET_USER", null);
        return null;
      }
    }),
    bindMakeNullRequestTo: firestoreAction(context => {
      return context.bindFirestoreRef(
        "makeNull",
        db
          .collection("makeNull")
          .where("connection", "array-contains", auth.currentUser.uid)
      );
    })
  },
  modules: {}
});
