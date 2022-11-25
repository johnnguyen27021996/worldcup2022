<template>
  <div class="w-match" @click="onClickMatch">
    <div class="group-name">Bảng {{ group }}</div>
    <div class="detail-match" v-if="match">
      <div class="teams">
        <div class="group-team">
          <div class="country">
            <img :src="flagHome" alt="" />
            <span
              :class="{ winner: match.home_team.country === match.winner_code }"
              >{{ match.home_team.name }}</span
            >
          </div>
          <div
            class="goal"
            :class="{ winner: match.home_team.country === match.winner_code }"
          >
            {{ match.home_team.goals }}
          </div>
        </div>
        <div class="group-team">
          <div class="country">
            <img :src="flagAway" alt="" />
            <span
              :class="{ winner: match.away_team.country === match.winner_code }"
              >{{ match.away_team.name }}</span
            >
          </div>
          <div
            class="goal"
            :class="{ winner: match.away_team.country === match.winner_code }"
          >
            {{ match.away_team.goals }}
          </div>
        </div>
      </div>
      <div class="info-match">
        <div class="in-progress" v-if="match.status === 'in_progress'">
          {{ status[match.status] }}
        </div>
        <div class="notin-progress" v-else-if="match.status === 'completed'">
          <div>{{ status[match.status] }}</div>
          <div class="time">
            {{ moment(match.datetime).format("ddd, DD/MM") }}
          </div>
        </div>
        <div class="notin-progress" v-else>
          <div>{{ status[match.status] }}</div>
          <div class="time">
            {{ moment(match.datetime).format("ddd, DD/MM HH:mm") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import { useRouter } from "vue-router";
export default {
  name: "Match",
  props: {
    match: [Object, Array],
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const status = computed(() => store.state.matchStatus.matchStatus);
    const teams = computed(() => store.state.teams.teams);
    const { match } = toRefs(props);
    const flagHome = computed(() =>
      require(`@/assets/flags/${match.value.home_team.country}.png`)
    );
    const flagAway = computed(() =>
      require(`@/assets/flags/${match.value.away_team.country}.png`)
    );
    const group = computed(
      () =>
        teams.value.filter(
          (team) => team.country === match.value.home_team.country
        )[0].group_letter
    );
    const onClickMatch = () => {
      router.push("/match/" + match.value.id);
    };
    return { status, match, flagHome, flagAway, moment, group, onClickMatch };
  },
};
</script>

<style lang="scss" scoped>
.w-match {
  padding: 16px 0;
  background-color: #fafafa;
  cursor: pointer;
  .group-name {
    font-size: 14px;
    font-weight: 400;
    color: #70757a;
    margin-bottom: 6px;
    padding: 0 24px;
  }
  .detail-match {
    display: grid;
    grid-template-columns: 264px 110px;
    .teams {
      .group-team {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .country {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-left: 24px;
          img {
            width: 24px;
            height: 24px;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: #70757a;
          }
          span.winner {
            color: #202124;
            font-weight: 500;
          }
        }
        .goal {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: #70757a;
          padding-right: 12px;
        }
        .goal.winner {
          color: #202124;
          font-weight: 500;
          background: url(@/assets/arrow-left.png) no-repeat;
          background-size: 6px 8px;
          background-position: center right;
        }
      }
    }
    .info-match {
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      border-left: 1px solid #ecedef;
      .in-progress {
        color: #1e8e3e;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.4;
        padding-bottom: 2px;
        position: relative;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::after {
          position: absolute;
          content: "";
          width: 20px;
          height: 1.5px;
          background-color: #1e8e3e;
          left: 0;
          bottom: 0px;
          transform: translateX(-30px);
          animation-name: lineMove;
          animation-duration: 8s;
          animation-iteration-count: infinite;
        }
      }
      .notin-progress {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: #202124;
        .time {
          font-size: 12px;
          color: #70757a;
          font-weight: 500;
        }
      }
    }
  }
}
@keyframes lineMove {
  0% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(80px);
  }
  100% {
    transform: translateX(-30px);
  }
}
</style>
