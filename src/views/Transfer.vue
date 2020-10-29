<template>
  <div v-if="currUser">
    <v-card class="pa-3 mt-2" color="transparent">
      <v-form autocomplete="off" @submit.prevent="addTran">
        <v-select
          :items="friends"
          v-model="sender"
          label="Sender"
          :error-messages="
            sender === receiver && senderReceiverNotEmpty
              ? 'Sender And Receiver can\'t be same'
              : ''
          "
          solo
        ></v-select>
        <v-select
          :items="friends"
          v-model="receiver"
          :error-messages="
            sender === receiver && senderReceiverNotEmpty
              ? 'Sender And Receiver can\'t be same'
              : ''
          "
          label="Receiver"
          solo
        ></v-select>
        <v-text-field
          type="number"
          label="Amount"
          v-model="amount"
          solo
          dense
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="description"
          counter="30"
          solo
          dense
        ></v-text-field>
        <v-btn
          block
          type="submit"
          color="primary"
          dark
          @click="loading = true"
          :loading="loading"
          >Submit</v-btn
        >
      </v-form>
    </v-card>
    <v-card
      :class="
        sender === currUser.name ? 'light-green accent-3' : 'red accent-2'
      "
      class="mt-2 px-2 pb-4"
      loading
      v-if="
        !sameSenderReceiver &&
          senderOrReceiver &&
          senderReceiverNotEmpty &&
          amount
      "
    >
      <v-row no-gutters class="my-2">
        <v-col>
          <h2 class="text-center font-rc">{{ sender }}</h2>
        </v-col>
        <v-col class="text-center pt-1">
          <v-icon>double_arrow</v-icon>
        </v-col>
        <v-col>
          <h2 class="text-center font-rc">{{ receiver }}</h2>
        </v-col>
      </v-row>
      <div>
        <h2 class="text-center font-rc blue-grey lighten-5">{{ amount }}</h2>
        <h4 class="font-rc px-2 mt-1 text-capitalize text-center">
          {{ description }}
        </h4>
      </div>
    </v-card>
    <v-card v-else class="pa-3 mt-2 red darken-4">
      <h5 class="text-center font-rc white--text">
        All Fields are required, {{ this.currUser.name }}(You) should be a
        Sender or a Receiver and Sender and Receiver Should not be same
      </h5>
    </v-card>
    <v-snackbar v-model="snackbar" timeout="7000" color="success">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db, firebase } from "@/firebase/init.js";
export default {
  name: "Transfer",
  data() {
    return {
      sender: "",
      receiver: "",
      description: "",
      amount: null,

      loading: false,
      snackbar: false,
      snackbarText: "",

      rules: {
        required: value => !!value || "Required.",
        sameInputSender: () => {
          return (
            this.sender !== this.receiver || "Sender And Receiver can't be same"
          );
        },
        sameInputReceiver: () => {
          return (
            this.sender !== this.receiver || "Sender And Receiver can't be same"
          );
        }
      }
    };
  },
  computed: {
    senderReceiverNotEmpty() {
      return this.sender !== "" && this.receiver !== "";
    },
    senderOrReceiver() {
      if (this.currUser) {
        return (
          this.sender === this.currUser.name ||
          this.receiver === this.currUser.name
        );
      }
      return null;
    },
    sameSenderReceiver() {
      return this.sender === this.receiver;
    },
    senderId() {
      if (this.sender !== "" && this.getUsers) {
        return this.getUsers.filter(user => {
          return user.name === this.sender;
        })[0].id;
      }
      return null;
    },
    receiverId() {
      if (this.receiver !== "" && this.getUsers) {
        return this.getUsers.filter(user => {
          return user.name === this.receiver;
        })[0].id;
      }
      return null;
    },
    friends() {
      if (this.currUser && this.getUsers) {
        const names = [];
        this.currUser.friends.forEach(id => {
          const name = this.getUsers.filter(user => {
            return user.id === id;
          })[0].name;
          names.push(name);
        });
        return names;
      }
      return null;
    },
    ...mapGetters([
      "getUsers",
      "currUser"
      // ...
    ])
  },
  methods: {
    addTran() {
      if (
        this.senderReceiverNotEmpty &&
        this.senderOrReceiver &&
        !this.sameSenderReceiver &&
        this.senderId &&
        this.receiverId &&
        this.amount
      ) {
        db.collection("transfer")
          .add({
            transaction: firebase.firestore.FieldValue.arrayUnion(
              this.senderId,
              this.receiverId
            ),
            description: this.description.slice(0, 31),
            amount: Number(this.amount),
            timestamp: Date.now()
          })
          .then(() => {
            this.snackbar = true;
            this.snackbarText = `Transaction between ${this.sender} and ${this.receiver}
            of Rs ${this.amount} is Completed`;
            this.loading = false;
            this.amount = null;
            this.sender = "";
            this.receiver = "";
            this.description = "";
          });
      } else {
        this.loading = false;
      }
    }
  }
};
</script>
