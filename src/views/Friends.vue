<template>
  <div>
    <v-list>
      <h2 class="font-rc pl-3">Friends</h2>
      <v-card class="mt-3">
        <v-list-item
          v-for="(friend, i) in templateGetUsers"
          :key="i"
          :to="`/friends/${friend}`"
        >
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>
              mdi-account
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="getName(friend)"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              :class="
                getAmount(friend) > 0
                  ? 'lime accent-3'
                  : 'red accent-3 white--text'
              "
              class="px-4"
            >
              {{ getAmount(friend) }}
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
      "currUser",
      "transfer"
      // ...
    ])
  },
  methods: {
    getName(userId) {
      return this.getUsers.filter(user => {
        return user.id === userId;
      })[0].name;
    },
    getAmount(userId) {
      const transfersBetween = this.transfer.filter(t => {
        return (
          (t.transaction[0] === this.currUser.id &&
            t.transaction[1] === userId) ||
          (t.transaction[1] === this.currUser.id && t.transaction[0] === userId)
        );
      });
      return (
        transfersBetween
          .filter(t => {
            return t.transaction[0] === this.currUser.id;
          })
          .reduce((a, { amount }) => a + amount, 0) -
        transfersBetween
          .filter(t => {
            return t.transaction[1] === this.currUser.id;
          })
          .reduce((a, { amount }) => a + amount, 0)
      );
    }
  }
};
</script>

<style></style>
