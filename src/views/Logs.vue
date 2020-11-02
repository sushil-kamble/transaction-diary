<template>
  <div>
    <v-card
      :dark="totatProfit < 0"
      :color="totatProfit >= 0 ? 'lime accent-3' : 'red accent-3'"
      class="px-4 mb-2 d-flex justify-space-between"
    >
      <h1 v-if="currUser" class="font-ub">{{ currUser.name }}</h1>
      <h1 class="font-ub">{{ totatProfit }}</h1>
    </v-card>
    <v-divider dark></v-divider>
    <div class="mt-2">
      <h2 class="font-ub white--text">Transfer History</h2>
      <v-divider></v-divider>
      <v-data-iterator
        :items="transfer"
        class="mt-2"
        v-if="currUser"
        disable-pagination
        disable-filtering
        hide-default-footer
      >
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
                  class="d-flex justify-space-between px-2 font-ub"
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
                <div class="d-flex justify-space-between px-2 font-ub">
                  <span class="grey--text">
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
