<template>
  <div>
    <!-- Friend Requests -->
    <FriendRequests />

    <v-divider class="my-2" dark></v-divider>

    <!-- Available Friends -->
    <AvailableUsers />
  </div>
</template>

<script>
import FriendRequests from "@/components/find_friends/FriendRequests";
import AvailableUsers from "@/components/find_friends/AvailableUsers";
export default {
  name: "FindFriends",
  components: {
    FriendRequests,
    AvailableUsers
  }
};
</script>

<style></style>
