<template>
  <nav class="w-navbar">
    <div class="m-navbar">
      <div class="i-navbar" @click="$router.push('/').catch(() => {})">
        Lịch thi đấu
      </div>
      <div class="i-navbar" @click="$router.push('/groups').catch(() => {})">
        Bảng xếp hạng
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<style lang="scss">
.w-navbar {
  width: 100%;
  background-color: #2f3542;
  .m-navbar {
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
    align-items: center;
    height: 60px;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    .i-navbar {
      color: #ffffff;
      cursor: pointer;
      padding: 0 20px;
      transition: all 0.5s ease;
      &:hover {
        color: #1e90ff;
      }
    }
  }
}
</style>
