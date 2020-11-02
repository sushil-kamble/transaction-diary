<template>
  <div v-if="incomingRequest">
    <h2 class="font-ub ml-2 white--text">Friends Requests</h2>
    <v-card class="mt-1" v-if="incomingRequest.length !== 0" dark>
      <v-list-item v-for="(user, j) in incomingRequest" :key="j">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark>
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="getName(user.from)"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-item-group>
            <v-btn
              small
              class="mr-2"
              @click="
                loading2 = true;
                index = j;
                acceptRequest(user.from);
              "
              :loading="loading2 && index === j"
              color="success"
            >
              Accept
            </v-btn>
            <v-btn small @click="rejectRequest(user.from)" color="error">
              Reject
            </v-btn>
          </v-item-group>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <div v-else>
      <h4 class="font-rc grey--text ml-2">No Friend Request</h4>
    </div>
  </div>
</template>

<script>
import { db, firebase } from "@/firebase/init.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      index: -1,
      friendRequest: [],

      loading2: false
    };
  },
  firestore: {
    friendRequest: db.collection("friendRequest")
  },
  computed: {
    ...mapGetters([
      "getUsers",
      "currUser"
      // ...
    ]),
    incomingRequest() {
      if (this.friendRequest && this.currUser) {
        return this.friendRequest.filter(data => {
          return data.to === this.currUser.id;
        });
      }
      return null;
    }
  },
  methods: {
    rejectRequest(userId) {
      db.collection("friendRequest")
        .doc(userId + "-" + this.currUser.id)
        .delete()
        .then(() => {
          //
        });
    },
    acceptRequest(userId) {
      db.collection("users")
        .doc(this.currUser.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(userId)
        })
        .then(() => {
          db.collection("users")
            .doc(userId)
            .update({
              friends: firebase.firestore.FieldValue.arrayUnion(
                this.currUser.id
              )
            })
            .then(() => {
              db.collection("friendRequest")
                .doc(userId + "-" + this.currUser.id)
                .delete()
                .then(() => {
                  this.loading2 = false;
                });
            });
        });
    },
    getName(userId) {
      return this.getUsers.filter(user => {
        return user.id === userId;
      })[0].name;
    }
  }
};
</script>
