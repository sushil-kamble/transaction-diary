<template>
  <div>
    <div v-if="toggle">
      <Login @registerView="toggle = !toggle" />
    </div>

    <div v-else>
      <Register @loginView="toggle = !toggle" />
    </div>
  </div>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

export default {
  name: "Auth",
  components: {
    Login,
    Register
  },
  data() {
    return {
      toggle: true
    };
  }
};
</script>

<style scoped></style>
