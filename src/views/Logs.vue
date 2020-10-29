<template>
  <div>
    <v-card
      :dark="totatProfit < 0"
      :color="totatProfit >= 0 ? 'lime accent-3' : 'red accent-3'"
      class="px-4 mb-2 d-flex justify-space-between"
    >
      <h2 v-if="currUser" class="font-rc">{{ currUser.name }}</h2>
      <h2 class="font-rc">{{ totatProfit }}</h2>
    </v-card>
    <v-divider></v-divider>
    <div>
      <h2 class="text-center font-rc">Transfer History</h2>
      <v-divider></v-divider>
      <v-data-iterator :items="transfer" class="mt-2" v-if="currUser">
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
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
  name: "Logs",
  computed: {
    ...mapGetters([
      "getUsers",
      "currUser",
      "transfer"
      // ...
    ]),
    transferReady() {
      return this.transfer.length !== 0 ? true : false;
    },
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
    getTime(time) {
      return moment(time).format("lll");
    }
  }
};
</script>

<style></style>
