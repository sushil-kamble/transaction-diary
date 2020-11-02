<template>
  <v-app>
    <Navbar />
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer>
      <Bottom />
    </v-footer>
  </v-app>
</template>

<script>
import Bottom from "@/components/layout/Bottom";
import Navbar from "@/components/layout/Navbar";
export default {
  name: "App",
  components: {
    Bottom,
    Navbar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Ubuntu&display=swap");
#app {
  background-color: #263238;
}
.font-rc {
  font-family: "Roboto Condensed", sans-serif;
}
.font-ub {
  font-family: "Ubuntu", sans-serif;
}
</style>
