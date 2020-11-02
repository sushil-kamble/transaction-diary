<template>
  <div class="home">
    <v-card
      class="mx-auto mt-2"
      outlined
      v-for="menu in menus"
      :key="menu.title"
      :color="menu.color"
      dark
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="mb-1 font-ub">
            <h3>{{ menu.title }}</h3>
          </v-list-item-title>
          <v-list-item-subtitle class="font-rc">
            {{ menu.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn block :to="{ name: menu.link }" class="font-rc">
          {{ menu.buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      menus: [
        {
          title: "Add Transaction",
          description: "Add Transaction between you and other person",
          buttonText: "Add Trasaction",
          link: "Transfer",
          color: "blue-grey"
        },
        {
          title: "Your Logs",
          description: "See your Transaction histoy",
          buttonText: "See Logs",
          link: "Logs",
          color: "blue-grey darken-1"
        },
        {
          title: "Your Friends",
          description: "See your transaction history wrt your friend",
          buttonText: "Friends",
          link: "Friends",
          color: "blue-grey darken-2"
        },
        {
          title: "Find Friends",
          description: "Find Friends and add the to your friend list",
          buttonText: "Find Friends",
          link: "FindFriends",
          color: "blue-grey darken-3"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
