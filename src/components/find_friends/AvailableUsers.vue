<template>
  <div>
    <v-list>
      <h2 class="font-rc pl-2">Available Users</h2>
      <v-card class="mt-1">
        <v-list-item v-for="(user, i) in templateUsers" :key="i">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>
              mdi-account
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              small
              @click="
                loading = true;
                index = i;
                addFriendRequest(user.id);
              "
              :loading="loading && index === i"
              :color="newRequest(user.id) ? 'primary' : 'success'"
            >
              <span v-if="newRequest(user.id)">Request</span>
              <span v-else>Requested</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/firebase/init.js";
export default {
  data() {
    return {
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
    },
    newRequest(userId) {
      return this.friendRequest.filter(data => {
        return data.from === this.currUser.id && data.to === userId;
      }).length === 0
        ? true
        : false;
    },
    getName(userId) {
      return this.users.filter(user => {
        return user.id === userId;
      })[0].name;
    }
  }
};
</script>
