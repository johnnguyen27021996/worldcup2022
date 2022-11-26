<template>
  <div class="w-detail-match" v-if="match">
    <div class="detail-status">
      <template v-if="statusMatch === 'completed'">Kết thúc</template>
      <template v-else-if="statusMatch === 'in_progress'"
        ><div class="in_progress-match">{{ match.time }}</div>
      </template>
      <template v-else>Sắp diễn ra</template>
    </div>
    <div class="detail-team">
      <div class="detail-team-flag">
        <img :src="flagHome" alt="" />
        <div>{{ match.homeTeam.name }}</div>
      </div>
      <div>{{ match.homeTeam.goals }}</div>
      <div>-</div>
      <div>{{ match.awayTeam.goals }}</div>
      <div class="detail-team-flag">
        <img :src="flagAway" alt="" />
        <div>{{ match.awayTeam.name }}</div>
      </div>
    </div>
    <div class="match-stage">Vòng Đấu bảng · Bảng {{ group }}</div>
    <div class="detail-tabs">
      <div
        @click="changeTab('first')"
        :class="{ active: activeTab === 'first' }"
      >
        DIỄN BIẾN CHÍNH
      </div>
      <div
        @click="changeTab('second')"
        :class="{ active: activeTab === 'second' }"
      >
        ĐỘI HÌNH RA SÂN
      </div>
      <div
        @click="changeTab('third')"
        :class="{ active: activeTab === 'third' }"
      >
        THỐNG KÊ
      </div>
    </div>
    <div class="main-action" v-show="activeTab === 'first'">
      <div class="start">
        <img src="@/assets/stopwatch_icon.svg" alt="" />
        <div>BẮT ĐẦU</div>
        <div class="time">{{ moment(match.date).format("HH:mm") }}</div>
      </div>
      <div class="action-item" v-for="(action, index) in actions" :key="index">
        <div class="action-head-item">
          <template v-if="action.eventName === 'bookings'">
            <div class="action-head-item-main" v-if="action.Card === 1">
              <img src="@/assets/yellow_card_icon.svg" alt="" />
              <div>THẺ VÀNG</div>
            </div>
            <div class="action-head-item-main" v-if="action.Card === 2">
              <img src="@/assets/red_card_icon.svg" alt="" />
              <div>THẺ ĐỎ</div>
            </div>
          </template>
          <template v-if="action.eventName === 'goals'">
            <div class="action-head-item-main">
              <img src="@/assets/goal_icon.svg" alt="" />
              <div>VÀOOOOO!</div>
            </div>
          </template>
          <template v-if="action.eventName === 'substitutions'">
            <div class="action-head-item-main">
              <img src="@/assets/substitution_icon.svg" alt="" />
              <div>THAY NGƯỜI</div>
            </div>
          </template>
          <div class="minutes">{{ action.Minute }}'</div>
        </div>
        <div class="action-body-item">
          <div
            class="action-body-item-main"
            v-if="action.eventName === 'substitutions'"
          >
            <img :src="action.team === 'home' ? flagHome : flagAway" alt="" />
            <div>
              <div>
                Vào sân:
                {{
                  action.team === "home"
                    ? homePlayers.find((p) => p.IdPlayer === action.IdPlayerOn)[
                        "PlayerName"
                      ][0]["Description"]
                    : awayPlayers.find((p) => p.IdPlayer === action.IdPlayerOn)[
                        "PlayerName"
                      ][0]["Description"]
                }}
                #{{
                  action.team === "home"
                    ? homePlayers.find((p) => p.IdPlayer === action.IdPlayerOn)[
                        "ShirtNumber"
                      ]
                    : awayPlayers.find((p) => p.IdPlayer === action.IdPlayerOn)[
                        "ShirtNumber"
                      ]
                }}
              </div>
              <div>
                Ra sân:
                {{
                  action.team === "home"
                    ? homePlayers.find(
                        (p) => p.IdPlayer === action.IdPlayerOff
                      )["PlayerName"][0]["Description"]
                    : awayPlayers.find(
                        (p) => p.IdPlayer === action.IdPlayerOff
                      )["PlayerName"][0]["Description"]
                }}
                #{{
                  action.team === "home"
                    ? homePlayers.find(
                        (p) => p.IdPlayer === action.IdPlayerOff
                      )["ShirtNumber"]
                    : awayPlayers.find(
                        (p) => p.IdPlayer === action.IdPlayerOff
                      )["ShirtNumber"]
                }}
              </div>
            </div>
          </div>
          <div class="action-body-item-main" v-else>
            <img :src="action.team === 'home' ? flagHome : flagAway" alt="" />
            <div>
              {{
                action.team === "home"
                  ? homePlayers.find((p) => p.IdPlayer === action.IdPlayer)[
                      "PlayerName"
                    ][0]["Description"]
                  : awayPlayers.find((p) => p.IdPlayer === action.IdPlayer)[
                      "PlayerName"
                    ][0]["Description"]
              }}
              #{{
                action.team === "home"
                  ? homePlayers.find((p) => p.IdPlayer === action.IdPlayer)[
                      "ShirtNumber"
                    ]
                  : awayPlayers.find((p) => p.IdPlayer === action.IdPlayer)[
                      "ShirtNumber"
                    ]
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="squad"
      v-if="
        activeTab === 'second' &&
        awayPlayers.length > 0 &&
        homePlayers.length > 0
      "
    >
      <Tactics
        :isHomeTeam="true"
        :name="match.homeTeam.name"
        :flags="flagHome"
        :tactics="match.homeTeam.statistics.tactics"
        :players="homePlayers"
      ></Tactics>
      <Tactics
        :name="match.awayTeam.name"
        :flags="flagAway"
        :tactics="match.awayTeam.statistics.tactics"
        :players="awayPlayers"
      ></Tactics>
    </div>
    <div
      class="main-action"
      v-if="
        statusMatch !== 'completed' &&
        statusMatch !== 'in_progress' &&
        activeTab === 'third'
      "
    >
      <div class="start">
        <img src="@/assets/stopwatch_icon.svg" alt="" />
        <div>BẮT ĐẦU</div>
        <div class="time">{{ moment(match.date).format("HH:mm") }}</div>
      </div>
    </div>
    <div
      class="statistical"
      v-show="
        (statusMatch === 'completed' || statusMatch === 'in_progress') &&
        activeTab === 'third'
      "
    >
      <div class="statistical-item">
        <div><img :src="flagHome" alt="" /></div>
        <div>TEAM STATS</div>
        <div><img :src="flagAway" alt="" /></div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.attemptsOnGoal }}</div>
        <div>Số lần sút</div>
        <div>{{ stats.awayTeam.statistics.attemptsOnGoal }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.kicksOnTarget }}</div>
        <div>Sút trúng đích</div>
        <div>{{ stats.awayTeam.statistics.kicksOnTarget }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ ballPossessionHome }}%</div>
        <div>Kiểm soát bóng</div>
        <div>{{ ballPossessionAway }}%</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.passes }}</div>
        <div>Lượt chuyền bóng</div>
        <div>{{ stats.awayTeam.statistics.passes }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.passesCompleted }}</div>
        <div>Chuyền chính xác</div>
        <div>{{ stats.awayTeam.statistics.passesCompleted }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.foulsCommited }}</div>
        <div>Phạm lỗi</div>
        <div>{{ stats.awayTeam.statistics.foulsCommited }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.yellowCards }}</div>
        <div>Thẻ vàng</div>
        <div>{{ stats.awayTeam.statistics.yellowCards }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.redCards }}</div>
        <div>Thẻ đỏ</div>
        <div>{{ stats.awayTeam.statistics.redCards }}</div>
      </div>
      <div class="statistical-item">
        <div>{{ stats.homeTeam.statistics.corners }}</div>
        <div>phạt góc</div>
        <div>{{ stats.awayTeam.statistics.corners }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  fifaMatchStats,
  listIDHash,
  matchAPIEnv,
  matchStats,
} from "@/utils/data";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import Tactics from "@/components/Tactics.vue";

export default {
  name: "detail-match",
  components: { Tactics },
  setup() {
    const store = useStore();
    const teams = computed(() => store.state.teams.teams);
    const statusMatch = ref(null);
    const match = ref(null);
    const flagHome = computed(() =>
      require(`@/assets/flags/${match.value.homeTeam.country}.png`)
    );
    const flagAway = computed(() =>
      require(`@/assets/flags/${match.value.awayTeam.country}.png`)
    );
    const group = computed(
      () =>
        teams.value.filter(
          (team) => team.country === match.value.homeTeam.country
        )[0].group_letter
    );
    const activeTab = ref("first");
    const idHome = ref(null);
    const idAway = ref(null);
    const stats = ref({
      homeTeam: { statistics: {} },
      awayTeam: { statistics: {} },
    });
    const ballPossessionHome = ref(null);
    const ballPossessionAway = ref(null);
    const interval = ref(null);
    const actions = ref([]);
    const homePlayers = ref([]);
    const awayPlayers = ref([]);
    const getMatch = (id) => {
      return axios
        .get("https://copa22.medeiro.tech/matches/" + id)
        .then((data) => {
          match.value = data.data;
          statusMatch.value = data.data.status;
          idHome.value = teams.value.find(
            (t) => t.country === data.data.homeTeam.country
          ).id_fifa;
          idAway.value = teams.value.find(
            (t) => t.country === data.data.awayTeam.country
          ).id_fifa;
        });
    };
    const getActionMatch = (idMatch, idStage = 285063) => {
      axios
        .get(
          "https://api.fifa.com/api/v3/live/football/17/255711/" +
            idStage +
            "/" +
            idMatch
        )
        .then((data) => {
          actions.value = creatActionMatch(data.data);
          ballPossessionHome.value = Number(
            data.data.BallPossession.OverallHome
          ).toFixed(0);
          ballPossessionAway.value = 100 - ballPossessionHome.value;
          homePlayers.value = data.data.HomeTeam.Players;
          awayPlayers.value = data.data.AwayTeam.Players;
        });
    };
    const creatActionMatch = (data) => {
      const actionHome = [],
        actionAway = [];
      let actionTotal = [];
      if (data.HomeTeam.Bookings.length > 0) {
        data.HomeTeam.Bookings.forEach((b) => {
          actionHome.push(
            Object.assign({}, b, { eventName: "bookings", team: "home" })
          );
        });
      }
      if (data.HomeTeam.Goals.length > 0) {
        data.HomeTeam.Goals.forEach((g) => {
          actionHome.push(
            Object.assign({}, g, { eventName: "goals", team: "home" })
          );
        });
      }
      if (data.HomeTeam.Substitutions.length > 0) {
        data.HomeTeam.Substitutions.forEach((s) => {
          actionHome.push(
            Object.assign({}, s, { eventName: "substitutions", team: "home" })
          );
        });
      }
      if (data.AwayTeam.Bookings.length > 0) {
        data.AwayTeam.Bookings.forEach((b) => {
          actionAway.push(
            Object.assign({}, b, { eventName: "bookings", team: "away" })
          );
        });
      }
      if (data.AwayTeam.Goals.length > 0) {
        data.AwayTeam.Goals.forEach((g) => {
          actionAway.push(
            Object.assign({}, g, { eventName: "goals", team: "away" })
          );
        });
      }
      if (data.AwayTeam.Substitutions.length > 0) {
        data.AwayTeam.Substitutions.forEach((s) => {
          actionAway.push(
            Object.assign({}, s, { eventName: "substitutions", team: "away" })
          );
        });
      }
      actionTotal = [...actionHome, ...actionAway];
      if (actionTotal.length > 0) {
        actionTotal.forEach((i) => {
          i.Minute = processMinutes(i.Minute);
        });
        actionTotal.sort((a, b) => a.Minute - b.Minute);
      }
      return actionTotal;
    };
    const processMinutes = (data) => {
      let minutes = data;
      const b = data.split("+");
      if (b.length === 1) {
        minutes = b[0].split("'")[0];
      }
      if (b.length === 2) {
        minutes = Number(b[0].split("'")[0]) + Number(b[1].split("'")[0]);
      }
      return minutes;
    };
    const changeTab = (tab) => {
      activeTab.value = tab;
    };
    const getStats = (idIFES) => {
      axios
        .get(
          "https://fdh-api.fifa.com/v1/stats/match/" + idIFES + "/teams.json"
        )
        .then((data) => {
          const statsData = data.data;
          const homeTeam = {},
            awayTeam = {};
          statsData[idHome.value].forEach((item) => {
            if (fifaMatchStats.includes(item[0])) {
              homeTeam[matchStats[item[0]]] = item[1];
            }
          });
          statsData[idAway.value].forEach((item) => {
            if (fifaMatchStats.includes(item[0])) {
              awayTeam[matchStats[item[0]]] = item[1];
            }
          });
          stats.value.homeTeam.statistics = homeTeam;
          stats.value.awayTeam.statistics = awayTeam;
        });
    };
    return {
      getMatch,
      statusMatch,
      match,
      flagHome,
      flagAway,
      group,
      activeTab,
      changeTab,
      getActionMatch,
      getStats,
      stats,
      ballPossessionHome,
      ballPossessionAway,
      interval,
      actions,
      moment,
      homePlayers,
      awayPlayers,
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      const idHash = listIDHash[id - 1].id;
      const idEnv = matchAPIEnv[id - 1].IdMatch;
      const idIFES = matchAPIEnv[id - 1].IdIFES;
      this.getMatch(idHash).then(() => {
        this.getStats(idIFES);
      });
      this.getActionMatch(idEnv);

      this.interval = setInterval(() => {
        if (this.statusMatch === "in_progress") {
          this.getMatch(idHash);
          this.getStats(idIFES);
          this.getActionMatch(idEnv);
        }
      }, 1000 * 60);
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.w-detail-match {
  width: 752px;
  margin: 0 auto 40px;
  border: solid 1px #ebebeb;
  border-radius: 0 0 2px 2px;
  .detail-status {
    color: #202124;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400px;
    margin: 10px 16px 7px;
  }
  .detail-team {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 36px;
    font-weight: 400;
    color: #202124;
    padding: 4px 80px 8px;
    .detail-team-flag {
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      img {
        width: 48px;
        height: 48px;
      }
    }
  }
  .match-stage {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.58;
    text-align: center;
  }
  .detail-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    div {
      cursor: pointer;
      font-size: 12px;
      font-weight: 300;
      line-height: 16px;
      padding: 16px 0 14px;
      text-align: center;
      border-bottom: 2px solid #ebebeb;
    }
    div.active {
      border-color: #4285f4;
    }
  }
  .main-action {
    margin-top: 10px;
    padding: 20px 80px;
    .start {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 40px;
        height: 36px;
        margin-bottom: 4px;
      }
      div {
        font-size: 14px;
        line-height: 20px;
        color: #70757a;
        font-weight: 600;
      }
      .time {
        font-size: 12px;
        font-weight: 300;
      }
    }
    .action-item {
      margin-top: 10px;
      border-radius: 5px;
      box-shadow: 0px 5px 26px 0px rgb(0 0 0 / 22%),
        0px 20px 28px 0px rgb(0 0 0 / 30%);
    }
    .action-head-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      border-bottom: 1px solid #ebebeb;
      .action-head-item-main {
        display: flex;
        align-items: center;
        gap: 20px;
        color: #202124;
        font-size: 12px;
        font-weight: 600;
      }
      .minutes {
        font-size: 12px;
        font-weight: 400;
        color: #70757a;
      }
    }
    .action-body-item {
      padding: 8px 16px 16px;
      .action-body-item-main {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 14px;
        line-height: 1.5;
        color: #202124;
        font-weight: 500;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .squad {
    padding: 20px 80px;
  }
  .statistical {
    padding: 4px 16px 20px;
    margin: 8px 8px;
    .statistical-item {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 300;
        color: #202124;
        height: 40px;
        &:first-child {
          height: 48px;
        }
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
.in_progress-match {
  width: 30px;
  text-align: center;
  position: relative;
  color: #1e8e3e;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::before {
    position: absolute;
    content: "";
    background: #1e8e3e;
    width: 7px;
    height: 2px;
    left: 0;
    bottom: 0px;
    transform: translateX(-10px);
    animation-name: moved;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
}
@keyframes moved {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(35px);
  }
  100% {
    transform: translateX(-10px);
  }
}
</style>
