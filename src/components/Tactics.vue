<template></template>

<script>
export default {
  name: "tactics",
  props: {
    players: [Object, Array],
    tactics: String,
    isHomeTeam: {
      type: Boolean,
      defaalt: false,
    },
  },
  computed: {
    line() {
      return this.tactics.split("-").length + 1;
    },
  },
};
</script>

<style></style>
