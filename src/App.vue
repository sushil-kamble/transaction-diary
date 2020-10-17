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
    <!-- Bottom Navigation -->
    <Bottom />
    <!-- Bottom Navigation -->
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
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");
#app {
  background-color: lightcyan;
}
.font-rc {
  font-family: "Roboto Condensed", sans-serif;
}
</style>
