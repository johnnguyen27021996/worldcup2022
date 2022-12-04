<template>
  <div class="w-knockout">
    <div class="item">
      <div class="title">Vòng 16 đội</div>
      <template v-for="match in matches['round_of_16']" :key="match.id">
        <div class="detail" @click="getDetailMatch(match)">
          <span class="team"
            ><img
              :src="require(`@/assets/flags/${match.home_team.country}.png`)"
              alt=""
            />{{ match.home_team.name }}</span
          >
          <span class="goals">{{ match.home_team.goals }}</span>
          <div>
            <div class="in-progress" v-if="match.status === 'in_progress'">
              <span class="text">{{ status[match.status] }}</span>
            </div>
            <div
              class="notin-progress"
              v-else-if="match.status === 'completed'"
            >
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
          <span class="goals">{{ match.away_team.goals }}</span>
          <span class="team right"
            >{{ match.away_team.name
            }}<img
              :src="require(`@/assets/flags/${match.away_team.country}.png`)"
              alt=""
          /></span>
        </div>
      </template>
    </div>

    <div class="item">
      <div class="title">Vòng tứ kết</div>
      <template v-for="match in matches['quarter-final']" :key="match.id">
        <div class="detail">
          <div
            style="width: 752px; text-align: center"
            v-if="!match.home_team_country && !match.away_team_country"
          >
            <div class="notin-progress">
              <div>Chưa xác định cặp đấu</div>
              <div class="time">
                {{ moment(match.datetime).format("ddd, DD/MM HH:mm") }}
              </div>
            </div>
          </div>
          <template v-else>
            <span class="team"
              ><img
                :src="require(`@/assets/flags/${match.home_team.country}.png`)"
                alt=""
              />{{ match.home_team.name }}</span
            >
            <span class="goals">{{ match.home_team.goals }}</span>
            <div>
              <div class="in-progress" v-if="match.status === 'in_progress'">
                <span class="text">{{ status[match.status] }}</span>
              </div>
              <div
                class="notin-progress"
                v-else-if="match.status === 'completed'"
              >
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
            <span class="goals">{{ match.away_team.goals }}</span>
            <span class="team right"
              >{{ match.away_team.name
              }}<img
                :src="require(`@/assets/flags/${match.away_team.country}.png`)"
                alt=""
            /></span>
          </template>
        </div>
      </template>
    </div>

    <div class="item">
      <div class="title">Vòng bán kết</div>
      <template v-for="match in matches['semi-final']" :key="match.id">
        <div class="detail">
          <div
            style="width: 752px; text-align: center"
            v-if="!match.home_team_country && !match.away_team_country"
          >
            <div class="notin-progress">
              <div>Chưa xác định cặp đấu</div>
              <div class="time">
                {{ moment(match.datetime).format("ddd, DD/MM HH:mm") }}
              </div>
            </div>
          </div>
          <template v-else>
            <span class="team"
              ><img
                :src="require(`@/assets/flags/${match.home_team.country}.png`)"
                alt=""
              />{{ match.home_team.name }}</span
            >
            <span class="goals">{{ match.home_team.goals }}</span>
            <div>
              <div class="in-progress" v-if="match.status === 'in_progress'">
                <span class="text">{{ status[match.status] }}</span>
              </div>
              <div
                class="notin-progress"
                v-else-if="match.status === 'completed'"
              >
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
            <span class="goals">{{ match.away_team.goals }}</span>
            <span class="team right"
              >{{ match.away_team.name
              }}<img
                :src="require(`@/assets/flags/${match.away_team.country}.png`)"
                alt=""
            /></span>
          </template>
        </div>
      </template>
    </div>

    <div class="item">
      <div class="title">Tranh giải 3 vs 4</div>
      <template
        v-for="match in matches['play-off_for_third_place']"
        :key="match.id"
      >
        <div class="detail">
          <div
            style="width: 752px; text-align: center"
            v-if="!match.home_team_country && !match.away_team_country"
          >
            <div class="notin-progress">
              <div>Chưa xác định cặp đấu</div>
              <div class="time">
                {{ moment(match.datetime).format("ddd, DD/MM HH:mm") }}
              </div>
            </div>
          </div>
          <template v-else>
            <span class="team"
              ><img
                :src="require(`@/assets/flags/${match.home_team.country}.png`)"
                alt=""
              />{{ match.home_team.name }}</span
            >
            <span class="goals">{{ match.home_team.goals }}</span>
            <div>
              <div class="in-progress" v-if="match.status === 'in_progress'">
                <span class="text">{{ status[match.status] }}</span>
              </div>
              <div
                class="notin-progress"
                v-else-if="match.status === 'completed'"
              >
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
            <span class="goals">{{ match.away_team.goals }}</span>
            <span class="team right"
              >{{ match.away_team.name
              }}<img
                :src="require(`@/assets/flags/${match.away_team.country}.png`)"
                alt=""
            /></span>
          </template>
        </div>
      </template>
    </div>

    <div class="item">
      <div class="title">Chung kết</div>
      <template v-for="match in matches['final']" :key="match.id">
        <div class="detail">
          <div
            style="width: 752px; text-align: center"
            v-if="!match.home_team_country && !match.away_team_country"
          >
            <div class="notin-progress">
              <div>Chưa xác định cặp đấu</div>
              <div class="time">
                {{ moment(match.datetime).format("ddd, DD/MM HH:mm") }}
              </div>
            </div>
          </div>
          <template v-else>
            <span class="team"
              ><img
                :src="require(`@/assets/flags/${match.home_team.country}.png`)"
                alt=""
              />{{ match.home_team.name }}</span
            >
            <span class="goals">{{ match.home_team.goals }}</span>
            <div>
              <div class="in-progress" v-if="match.status === 'in_progress'">
                <span class="text">{{ status[match.status] }}</span>
              </div>
              <div
                class="notin-progress"
                v-else-if="match.status === 'completed'"
              >
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
            <span class="goals">{{ match.away_team.goals }}</span>
            <span class="team right"
              >{{ match.away_team.name
              }}<img
                :src="require(`@/assets/flags/${match.away_team.country}.png`)"
                alt=""
            /></span>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "@vue/reactivity";
import { computed, onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import { useRouter } from "vue-router";

export default {
  name: "knockout",
  setup() {
    const router = useRouter();
    const store = useStore();
    const status = computed(() => store.state.matchStatus.matchStatus);
    const matches = ref(new Object());
    const interval = ref(null);

    function getMatches() {
      axios.get("https://worldcupjson.net/matches").then((data) => {
        const matchesData = data.data;
        matches.value["round_of_16"] = matchesData.filter(
          (m) => m.stage_name === "Round of 16"
        );
        matches.value["quarter-final"] = matchesData.filter(
          (m) => m.stage_name === "Quarter-final"
        );
        matches.value["semi-final"] = matchesData.filter(
          (m) => m.stage_name === "Semi-final"
        );
        matches.value["play-off_for_third_place"] = matchesData.filter(
          (m) => m.stage_name === "Play-off for third place"
        );
        matches.value["final"] = matchesData.filter(
          (m) => m.stage_name === "Final"
        );
      });
    }

    function getDetailMatch(match) {
      if (match.status !== "in_progress" && match.status !== "completed")
        return;
      router.push("/match/" + match.id);
    }

    getMatches();

    onMounted(() => {
      interval.value = setInterval(() => {
        getMatches();
      }, 1000 * 60);
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });

    return { matches, status, moment, getDetailMatch };
  },
};
</script>

<style lang="scss" scoped>
.w-knockout {
  width: 752px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 40px;
  .item {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title {
    padding: 8px 4px 16px;
    color: #202124;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
    background-color: #fafafa;
  }
  .detail {
    cursor: pointer;
    display: grid;
    grid-template-columns: 2fr 1fr 4fr 1fr 2fr;
    align-items: center;
    text-align: center;
    background-color: #202124;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 0;
    margin-bottom: 1px;
    .in-progress {
      .text {
        display: inline-block;
        width: 80px;
        text-align: center;
        position: relative;
        color: #1e8e3e;
        overflow-x: hidden;
        padding: 2px 0;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 15px;
          height: 2px;
          background-color: #1e8e3e;
          transform: translateX(-20px);
          animation-name: statusMove;
          animation-duration: 8s;
          animation-iteration-count: infinite;
        }
      }
    }
    .notin-progress {
      .time {
        font-size: 12px;
        color: #70757a;
        font-weight: 500;
      }
    }
    .goals {
      font-size: 12px;
      font-weight: 600;
    }
    .team {
      display: flex;
      align-items: center;
      margin-left: 20px;
      img {
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
      &.right {
        justify-content: flex-end;
        margin-left: 0;
        margin-right: 20px;
        img {
          margin-right: 0;
          margin-left: 10px;
        }
      }
    }
  }
}
@keyframes statusMove {
  0% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(80px);
  }
  100% {
    transform: translateX(-20px);
  }
}
</style>
