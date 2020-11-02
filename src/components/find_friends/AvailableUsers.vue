<template>
  <div>
    <h2 class="font-ub pl-2 white--text">Available Users</h2>
    <v-card class="mt-1" dark>
      <v-list-item v-for="(user, i) in templateUsers" :key="i">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" light>
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-text="user.name"
            class="font-ub"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
            small
            @click="
              count += 1;
              loading = true;
              index = i;
              addFriendRequest(user.id);
            "
            :loading="loading && index === i"
            :color="
              newRequest(user.id) ? 'blue-grey darken-2' : 'green darken-4'
            "
          >
            <span v-if="newRequest(user.id)">Request</span>
            <span v-else>Requested</span>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/firebase/init.js";
export default {
  data() {
    return {
      count: 0,

      index: -1,
      friendRequest: [],

      loading: false
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
    templateUsers() {
      if (this.currUser) {
        return this.getUsers.filter(user => {
          return (
            user.id !== this.currUser.id &&
            !this.currUser.friends.includes(user.id)
          );
        });
      } else {
        return null;
      }
    }
  },
  methods: {
    addFriendRequest(userId) {
      if (this.count < 5) {
        if (this.newRequest(userId)) {
          db.collection("friendRequest")
            .doc(this.currUser.id + "-" + userId)
            .set({
              from: this.currUser.id,
              to: userId,
              timestamp: Date.now()
            })
            .then(() => {
              this.loading = false;
            });
        } else {
          db.collection("friendRequest")
            .doc(this.currUser.id + "-" + userId)
            .delete()
            .then(() => {
              this.loading = false;
            });
        }
      }
    },
    newRequest(userId) {
      if (this.friendRequest) {
        return this.friendRequest.filter(data => {
          return data.from === this.currUser.id && data.to === userId;
        }).length === 0
          ? true
          : false;
      }
      return false;
    },
    getName(userId) {
      return this.users.filter(user => {
        return user.id === userId;
      })[0].name;
    }
  }
};
</script>
