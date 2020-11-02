<template>
  <div v-if="getMakeNullTo">
    <h2 class="font-ub white--text ml-3" v-if="getMakeNullTo.length !== 0">
      Null Request
    </h2>
    <v-card class="px-2 mb-2" color="blue-grey darken-3" tile dark>
      <v-list-item v-for="(req, i) in getMakeNullTo" :key="i">
        <v-list-item-content>
          <v-list-item-title
            v-text="getName(req.from)"
            class="font-ub text-h6"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-item-group>
            <v-btn
              color="success"
              class="mr-2"
              @click="acceptRequest(req.from)"
              small
            >
              Accept
            </v-btn>
            <v-btn color="error" @click="deleteRequest(req.from)" small>
              Reject
            </v-btn>
          </v-item-group>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/firebase/init.js";
export default {
  name: "ActionNullRequest",
  computed: {
    ...mapGetters([
      "currUser",
      "getUsers",
      "getMakeNull"
      // ...
    ]),
    getMakeNullTo() {
      if (this.getMakeNull && this.currUser) {
        return this.getMakeNull.filter(req => {
          return req.to === this.currUser.id;
        });
      }
      return null;
    }
  },
  methods: {
    getName(userId) {
      const userName = this.getUsers.filter(user => {
        return user.id === userId;
      });
      if (userName.length !== 0) {
        return userName[0].name;
      } else {
        return userName;
      }
    },
    acceptRequest(id) {
      db.collection("transfer")
        .where("connection", "array-contains", this.currUser.id + "-" + id)
        .get()
        .then(querySnapshot => {
          var batch = db.batch();
          querySnapshot.forEach(function(doc) {
            // For each doc, add a delete operation to the batch
            batch.delete(doc.ref);
          });
          // Commit the batch
          batch.commit().then(() => {
            db.collection("makeNull")
              .doc(id + "-" + this.currUser.id)
              .delete()
              .then(() => {
                // Request Deleted
              });
          });
        });
    },
    deleteRequest(id) {
      db.collection("makeNull")
        .doc(id + "-" + this.currUser.id)
        .delete()
        .then(() => {
          // Request Deleted
        });
    }
  }
};
</script>
