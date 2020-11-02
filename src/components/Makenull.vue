<template>
  <v-btn
    @click="
      count += 1;
      makeNullRequest();
      loading = true;
    "
    :color="!alreadyExists ? 'secondary' : 'green darken-4'"
    :loading="loading"
    small
    dark
  >
    <span v-if="!alreadyExists">Make Null Request</span>
    <span v-else>Sent Null Request</span>
  </v-btn>
</template>

<script>
import { db, firebase } from "@/firebase/init.js";
import { mapGetters } from "vuex";
export default {
  name: "Makenull",
  props: ["nameId", "currUser"],
  data() {
    return {
      count: 0,
      loading: false
    };
  },
  computed: {
    ...mapGetters([
      "getMakeNull"
      // ...
    ]),
    alreadyExists() {
      if (this.getMakeNull) {
        return this.getMakeNull.filter(req => {
          return req.from === this.currUser && req.to === this.nameId;
        }).length === 0
          ? false
          : true;
      }
      return false;
    }
  },
  methods: {
    makeNullRequest() {
      if (this.count < 5) {
        if (!this.alreadyExists) {
          db.collection("makeNull")
            .doc(this.currUser + "-" + this.nameId)
            .set({
              from: this.currUser,
              to: this.nameId,
              connection: firebase.firestore.FieldValue.arrayUnion(
                this.currUser,
                this.nameId
              ),
              timestamp: Date.now()
            })
            .then(() => {
              this.loading = false;
            });
        } else {
          db.collection("makeNull")
            .doc(this.currUser + "-" + this.nameId)
            .delete()
            .then(() => {
              this.loading = false;
            });
        }
      }
    }
  }
};
</script>
