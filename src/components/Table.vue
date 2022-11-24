<template>
  <table class="table">
    <thead>
      <tr>
        <th>Đội</th>
        <th>ĐĐ</th>
        <th>Thắng</th>
        <th>H</th>
        <th>Thua</th>
        <th>BT</th>
        <th>SBT</th>
        <th>HS</th>
        <th>Đ</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(team, index) in tabelGroup" :key="index">
        <td>
          <div class="t-team">
            <span>{{ index + 1 }}</span
            ><img
              :src="require('@/assets/flags/' + team.country + '.png')"
              alt=""
            /><span>{{ team.name }}</span>
          </div>
        </td>
        <td>{{ team.games_played }}</td>
        <td>{{ team.wins }}</td>
        <td>{{ team.draws }}</td>
        <td>{{ team.losses }}</td>
        <td>{{ team.goals_for }}</td>
        <td>{{ team.goals_against }}</td>
        <td>{{ team.goal_differential }}</td>
        <td>{{ team.group_points }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    groups: [Object, Array],
  },
  watch: {
    groups: {
      deep: true,
      immediate: true,
      handler() {
        this.tabelGroup = this.groups.sort(
          (a, b) =>
            b.group_points - a.group_points ||
            b.goal_differential - a.goal_differential
        );
      },
    },
  },
  data() {
    return {
      tabelGroup: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  border-collapse: collapse;
  border-spacing: 0;
  background: #ffffff;
  table-layout: fixed;
  th,
  td {
    width: 60px;
    padding: 8px 0;
    text-align: center;
    font-size: 14px;
    &:first-child {
      width: 272px;
    }
  }
  th {
    color: #70757a;
    font-weight: 300;
    &:first-child {
      text-align: left;
      padding-left: 16px;
    }
  }
  td {
    color: #202124;
    font-weight: 400;
    &:first-child {
      text-align: left;
      padding-left: 24px;
      img {
        width: 24px;
        height: 24px;
        margin-left: 12px;
        margin-right: 12px;
      }
    }
  }
  tbody {
    tr {
      border-top: 1px solid #ecedef;
      &:nth-child(1) {
        td {
          position: relative;
          &:first-child {
            &::before {
              content: "";
              position: absolute;
              width: 3px;
              height: 38px;
              background: #4285f4;
              left: 0;
              top: 1px;
            }
          }
        }
      }
      &:nth-child(2) {
        td {
          position: relative;
          &:first-child {
            &::before {
              content: "";
              position: absolute;
              width: 3px;
              height: 38px;
              background: #4285f4;
              left: 0;
              top: 1px;
            }
          }
        }
      }
    }
  }
  .t-team {
    display: flex;
    align-items: center;
  }
}
</style>
