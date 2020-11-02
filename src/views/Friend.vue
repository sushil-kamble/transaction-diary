<template>
  <div>
    <v-sheet v-if="currUser">
      <v-card class="pa-2 d-flex justify-space-between" dark tile>
        <h2 class="font-ub">{{ getName($route.params.id) }}</h2>
        <!-- DIALOG UNFRIEND -->
        <Unfriend
          :name="getName($route.params.id)"
          :nameId="$route.params.id"
        />
        <!-- DIALOG UNFRIEND -->
      </v-card>
      <v-card
        class="pa-2 d-flex justify-space-between"
        :color="totatProfit >= 0 ? 'lime accent-3' : 'red accent-3 white--text'"
        tile
      >
        <span class="font-rc text-h3">{{ totatProfit }}</span>
        <Makenull :currUser="currUser.id" :nameId="$route.params.id" />
      </v-card>
    </v-sheet>

    <v-divider dark></v-divider>

    <div class="mt-4">
      <h2 class="font-ub white--text">History</h2>
      <v-data-iterator
        :items="transfersBetween"
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
              lg="6"
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
import Unfriend from "@/components/Unfriend";
import Makenull from "@/components/Makenull";
import moment from "moment";
export default {
  name: "Friend",
  components: {
    Unfriend,
    Makenull
  },
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
