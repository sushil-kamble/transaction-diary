<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      overlay-color="error"
      overlay-opacity="0.7"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" small text class="my-1 error" dark>
          Unfriend
        </v-btn>
      </template>

      <v-card dark>
        <v-card-title class="text-h5 text-ub red--text">
          Unfriend {{ name }}
        </v-card-title>

        <v-card-text class="font-ub">
          When you <strong class="red--text">Unfriend</strong> the
          {{ name }} the following will happen
          <ul class="my-2">
            <li>
              All the <span class="red--text">Transactions</span> between you
              and the {{ name }} will be
              <span class="red--text">Deleted</span>
            </li>
            <li>
              You will no longer will able to make Transactions with {{ name }}
              unless you add him as a friend, same applies to
              {{ name }} also.
            </li>
          </ul>
          <h2 class="font-ub red--text">Do you want to Unfriend {{ name }}?</h2>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            No
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            :loading="loading"
            @click="
              loading = true;
              dialog = false;
              unfriend();
            "
          >
            Yes, Unfriend {{ name }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { db, firebase } from "@/firebase/init.js";
export default {
  name: "Unfriend",
  props: ["name", "nameId"],
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters([
      "currUser"
      // ...
    ])
  },
  methods: {
    unfriend() {
      var batch = db.batch();
      const myself = db.collection("users").doc(this.currUser.id);
      batch.update(myself, {
        friends: firebase.firestore.FieldValue.arrayRemove(this.nameId)
      });
      const unfriended = db.collection("users").doc(this.nameId);
      batch.update(unfriended, {
        friends: firebase.firestore.FieldValue.arrayRemove(this.currUser.id)
      });

      db.collection("transfer")
        .where(
          "connection",
          "array-contains",
          this.currUser.id + "-" + this.nameId
        )
        .get()
        .then(function(querySnapshot) {
          var batch2 = db.batch();
          querySnapshot.forEach(function(doc) {
            // For each doc, add a delete operation to the batch
            batch2.delete(doc.ref);
          });
          // Commit the batch
          batch2.commit();
        })
        .then(function() {
          // Delete completed!
          // ...
        });
      batch.commit().then(() => {
        this.loading = false;
        this.$router.replace({ name: "Friends" });
      });
    }
  }
};
</script>
