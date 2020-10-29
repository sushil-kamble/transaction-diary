<template>
  <div>
    <v-app-bar color="blue accent-4" dense dark app>
      <v-toolbar-title>
        <router-link
          :to="{ name: 'Home' }"
          class="white--text text-decoration-none"
        >
          Transfer
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="font-rc"
              text
              dark
              v-bind="attrs"
              v-on="on"
              width="100"
            >
              {{ currUser.name }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn x-small text :to="{ name: 'Home' }">
                  Profile
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn text x-small @click="logout" color="error">
                  Log out
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <!-- DROPDOWN -->

    <!-- DROPDOWN -->
  </div>
</template>

<script>
import { auth } from "@/firebase/init.js";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    //
  }),
  computed: {
    isLoggedIn() {
      return this.currUser ? true : false;
    },
    ...mapGetters([
      // All USERS
      "getUsers",
      // CURRENT USER
      "currUser"
      // ...
    ])
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push({ name: "Auth" });
      });
    }
  }
};
</script>
