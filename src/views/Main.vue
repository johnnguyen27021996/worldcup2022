<template>
  <div class="w-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style lang="scss">
.w-main {
  max-width: 1240px;
  min-height: calc(100vh - 60px);
  margin: 0 auto;
}
</style>
