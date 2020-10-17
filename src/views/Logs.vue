<template>
  <div>
    <v-card
      :dark="totatProfit < 0"
      :color="totatProfit >= 0 ? 'lime accent-3' : 'red accent-3'"
      class="px-4 mb-2 d-flex justify-space-between"
    >
      <h2>{{ currUser.name }}</h2>
      <h2>{{ totatProfit }}</h2>
    </v-card>
    <v-divider></v-divider>
    <div>
      <h2 class="text-center font-rc">Transfer History</h2>
      <v-divider></v-divider>
      <v-sheet color="grey lighten-4" class="pa-3 mt-2" v-if="!transferReady">
        <v-skeleton-loader class="mx-auto" type="paragraph"></v-skeleton-loader>
      </v-sheet>
      <v-data-iterator :items="userTransfers" class="mt-2" v-else>
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
                    item.from === currUser.id
                      ? 'lime accent-3 black--text'
                      : 'red accent-3'
                  "
                >
                  <h3>
                    {{ getName(item.from) }}
                  </h3>
                  <h3>
                    {{ getName(item.to) }}
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
import { db } from "@/firebase/init.js";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Logs",
  data() {
    return {
      search: "",
      transfer: []
    };
  },
  computed: {
    ...mapGetters([
      "getUsers",
      "currUser"
      // ...
    ]),
    userTransfers() {
      if (this.transfer) {
        return this.transfer.filter(t => {
          return t.from === this.currUser.id || t.to === this.currUser.id;
        });
      }
      return null;
    },
    transferReady() {
      return this.userTransfers.length !== 0 ? true : false;
    },
    totatProfit() {
      if (this.transfer) {
        return (
          this.transfer
            .filter(t => {
              return t.from === this.currUser.id;
            })
            .reduce((a, { amount }) => a + amount, 0) -
          this.transfer
            .filter(t => {
              return t.to === this.currUser.id;
            })
            .reduce((a, { amount }) => a + amount, 0)
        );
      }
      return 0;
    }
  },
  firestore: {
    transfer: db.collection("transfer").orderBy("timestamp", "desc")
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
