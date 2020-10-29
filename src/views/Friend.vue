<template>
  <div>
    <v-card
      :dark="totatProfit < 0"
      :color="totatProfit >= 0 ? 'lime accent-3' : 'red accent-3'"
      class="px-4 mb-2 d-flex justify-space-between"
    >
      <h2 class="font-rc" v-if="currUser">{{ getName($route.params.id) }}</h2>
      <h2>{{ totatProfit }}</h2>
    </v-card>
    <v-divider></v-divider>
    <div>
      <v-data-iterator :items="transfersBetween" class="mt-2" v-if="currUser">
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
              lg="6"
              class="pa-0"
            >
              <v-card class="pa-2" tile dark>
                <div
                  class="d-flex justify-space-between px-2 font-rc"
                  :class="
                    item.transaction[0] === currUser.id
                      ? 'lime accent-3 black--text'
                      : 'red accent-3'
                  "
                >
                  <h3>
                    {{ getName(item.transaction[0]) }}
                  </h3>
                  <h3>
                    {{ getName(item.transaction[1]) }}
                  </h3>
                  <h3>
                    {{ item.amount }}
                  </h3>
                </div>
                <div class="d-flex justify-space-between px-2 font-rc">
                  <span class="grey--text font-italic">
                    {{ item.description }}
                  </span>
                  <h6>{{ getTime(item.timestamp) }}</h6>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Friend",
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getUsers",
      "currUser",
      "transfer"
      // ...
    ]),
    transfersBetween() {
      if (this.transfer && this.currUser) {
        return this.transfer.filter(t => {
          return (
            (t.transaction[0] === this.currUser.id &&
              t.transaction[1] === this.$route.params.id) ||
            (t.transaction[1] === this.currUser.id &&
              t.transaction[0] === this.$route.params.id)
          );
        });
      }
      return null;
    },
    totatProfit() {
      if (this.transfersBetween) {
        return (
          this.transfersBetween
            .filter(t => {
              return t.transaction[0] === this.currUser.id;
            })
            .reduce((a, { amount }) => a + amount, 0) -
          this.transfersBetween
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
    getTime(time) {
      return moment(time).format("lll");
    }
  }
};
</script>

<style></style>
