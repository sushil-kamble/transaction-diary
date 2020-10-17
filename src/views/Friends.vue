<template>
  <div>
    <v-list>
      <h2 class="font-rc pl-3">Friends</h2>
      <v-card class="mt-3">
        <v-list-item v-for="(friend, i) in templateGetUsers" :key="i">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>
              mdi-account
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="getName(friend)"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn dark class="font-rc" small :to="`/friends/${friend}`">
              View Profile
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Friends",
  computed: {
    templateGetUsers() {
      if (this.currUser) {
        return this.currUser.friends.filter(val => {
          return val !== this.currUser.id;
        });
      }
      return null;
    },
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getUsers",
      "currUser"
      // ...
    ])
  },
  methods: {
    getName(userId) {
      return this.getUsers.filter(user => {
        return user.id === userId;
      })[0].name;
    }
  }
};
</script>

<style></style>
