<template>
  <div class="w-group">
    <template v-for="group in groups" :key="group.letter">
      <div class="group-title">Bảng {{ group.letter }}</div>
      <Table :groups="group.teams"></Table>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import Table from "@/components/Table.vue";
export default {
  name: "Group",
  components: { Table },
  data() {
    return {
      groups: [],
    };
  },
  created() {
    this.getAllGroups();
  },
  methods: {
    getAllGroups() {
      axios.get("https://worldcupjson.net/teams").then((data) => {
        this.groups = data.data.groups;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.w-group {
  width: 752px;
  margin: 0 auto 40px;
  border: 1px solid #ecedef;
  .group-title {
    margin-bottom: 8px;
    margin-left: 16px;
    margin-top: 20px;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    color: #202124;
  }
}
</style>
