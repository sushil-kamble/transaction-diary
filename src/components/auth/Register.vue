<template>
  <!-- primary-font -->
  <v-card class="pa-4 py-12" tile dark>
    <h1 class="primary-font text-center">Register</h1>
    <v-form @submit.prevent="registed" autocomplete="off">
      <v-text-field
        label="Enter Name"
        v-model="name"
        append-icon="person"
      ></v-text-field>
      <v-text-field
        label="Email address"
        :rules="[rules.required, rules.email]"
        v-model="email"
        append-icon="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="showPass ? 'text' : 'password'"
        label="Password"
        hint="At least 6 characters"
        counter
        @click:append="showPass = !showPass"
      ></v-text-field>
      <v-text-field
        class="mb-2"
        append-icon="lock"
        :counter="password.length"
        :rules="[rules.required, rules.passwordConfirmation]"
        type="password"
        v-model="confirmPassword"
        label="Confirm Password"
      ></v-text-field>
      <h4 class="text-center mb-3">
        Already Have Account: <v-btn text @click="loginView">Login</v-btn>
      </h4>
      <h4 v-if="feedback" class="red--text text-center my-2 primary-font">
        {{ feedback }}
      </h4>
      <v-btn
        type="submit"
        color="secondary"
        class="font-ub"
        :loading="loading"
        block
        >Register</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { auth, db, firebase } from "@/firebase/init.js";

export default {
  name: "Register",
  data() {
    return {
      name: null,
      password: "",
      confirmPassword: "",
      email: "",

      showPass: false,
      feedback: null,

      loading: false,

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        email: v => this.validateEmail(v) || "Should be a valid email address.",
        passwordConfirmation: v =>
          this.validateConfirmPassword(v) || "Password does not match"
      }
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateConfirmPassword(password) {
      return this.password === password;
    },
    registed() {
      if (
        this.validateEmail(this.email) &&
        this.validateConfirmPassword(this.confirmPassword) &&
        this.name
      ) {
        this.loading = true;
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.feedback = "Account Created Successfully";
            this.$router.replace({ name: "Home" });
            db.collection("users")
              .doc(auth.currentUser.uid)
              .set({
                name: this.name,
                id: auth.currentUser.uid
              })
              .then(() => {
                db.collection("users")
                  .doc(auth.currentUser.uid)
                  .update({
                    friends: firebase.firestore.FieldValue.arrayUnion(
                      auth.currentUser.uid
                    )
                  })
                  .then(() => {
                    this.loading = false;
                  });
              });
          })
          .catch(err => {
            this.feedback = err.message;
            this.loading = false;
          });
      } else {
        this.feedback = "All fields are required & validated";
      }
    },
    loginView() {
      this.$emit("loginView");
    }
  }
};
</script>

<style></style>
