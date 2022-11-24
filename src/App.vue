<template>
  <Navbar></Navbar>
  <Main></Main>
</template>

<script>
import Main from "./views/Main.vue";
import Navbar from "./views/Navbar.vue";
export default {
  name: "app",
  components: { Main, Navbar },
};
</script>
