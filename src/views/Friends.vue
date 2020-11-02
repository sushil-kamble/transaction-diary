<template>
  <div>
    <v-card
      :dark="totatProfit < 0"
      :color="totatProfit >= 0 ? 'lime accent-3' : 'red accent-3'"
      class="px-4 mb-2 d-flex justify-space-between"
      tile
    >
      <h1 v-if="currUser" class="font-ub">{{ currUser.name }}</h1>
      <h1 class="font-ub">{{ totatProfit }}</h1>
    </v-card>
    <ActionNullRequest />
    <v-card class="mt-3 pa-1" color="blue-grey darken-4">
      <h2 class="font-ub pl-3 mb-2 white--text">Friends</h2>
      <v-list-item
        v-for="(friend, i) in templateGetUsers"
        :key="i"
        @click="gotothelink(friend)"
        :class="getAmount(friend) >= 0 ? 'lime accent-3' : 'red accent-3'"
        :dark="getAmount(friend) < 0"
      >
        <v-list-item-avatar>
          <v-icon class="blue-grey darken-4" dark>
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-text="getName(friend)"
            class="font-ub"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn class="px-4" dark>
            {{ getAmount(friend) }}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ActionNullRequest from "@/components/ActionNullRequest";
export default {
  name: "Friends",
  components: {
    ActionNullRequest
  },
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
    ]),
    totatProfit() {
      if (this.currUser && this.transfer) {
        return (
          this.transfer
            .filter(t => {
              return t.transaction[0] === this.currUser.id;
            })
            .reduce((a, { amount }) => a + amount, 0) -
          this.transfer
            .filter(t => {
              return t.transaction[1] === this.currUser.id;
            })
            .reduce((a, { amount }) => a + amount, 0)
        );
      }
      return 0;
    }
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
    },
    gotothelink(id) {
      this.$router.push({
        name: "Friend",
        params: { id }
      });
    }
  }
};
</script>

<style></style>
