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
          <v-list-item-title class="headline mb-1 font-rc">
            {{ menu.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ menu.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn block :to="{ name: menu.link }">
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
          color: "blue darken-1"
        },
        {
          title: "Your Logs",
          description: "See your Transaction histoy",
          buttonText: "See Logs",
          link: "Logs",
          color: "deep-orange accent-3"
        },
        {
          title: "Your Friends",
          description: "See your transaction history wrt your friend",
          buttonText: "Friends",
          link: "Friends",
          color: "purple darken-3"
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
