<template>
  <v-bottom-navigation
    class="pt-2"
    dark
    shift
    app
    grow
    v-model="value"
    :background-color="color"
    v-if="currUser"
  >
    <v-btn :to="{ name: 'Transfer' }">
      <span class="pt-2 font-rc text-uppercase">Transfer</span>

      <v-icon>mdi-bank-transfer</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'Logs' }">
      <span class="pt-2 font-rc text-uppercase">Logs</span>

      <v-icon>mdi-clipboard-list</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'Friends' }">
      <span class="pt-2 font-rc text-uppercase">Friends</span>

      <v-icon>mdi-account-heart</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'FindFriends' }">
      <span class="pt-2 font-rc text-uppercase">Find Friends</span>

      <v-icon>mdi-account-search</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({ value: 0 }),

  computed: {
    ...mapGetters(["currUser"]),
    color() {
      switch (this.value) {
        case 0:
          return "grey darken-1";
        case 1:
          return "grey darken-2";
        case 2:
          return "grey darken-3";
        case 3:
          return "grey darken-4";
        default:
          return "primary";
      }
    }
  }
};
</script>
