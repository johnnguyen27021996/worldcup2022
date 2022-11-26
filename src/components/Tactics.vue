<template>
  <div class="w-tactics">
    <img :class="{ isHomeTeam: isHomeTeam }" src="@/assets/soccer.png" alt="" />
    <div class="info-team" :class="{ isHomeTeam: isHomeTeam }">
      <div style="display: flex; align-items: center; gap: 20px">
        <img :src="flags" alt="" /><span>{{ name }}</span>
      </div>
      <div>{{ tactics }}</div>
    </div>
    <div class="tactics-main" :class="{ isHomeTeam: isHomeTeam }">
      <template v-for="i in line" :key="i">
        <div
          class="player-line"
          :style="{
            'grid-template-columns': 'repeat(' + listGrid(i) + ', 1fr)',
            height: 'calc(100% / ' + line + ')',
          }"
        >
          <div
            style="display: flex; flex-direction: column; align-items: center"
            v-if="i === 1"
          >
            <div class="name">
              {{ teamPositions[0][0]["PlayerName"][0]["Description"] }}
            </div>
            <div class="player" :class="{ isHomeTeam: isHomeTeam }">
              {{ teamPositions[0][0].ShirtNumber }}
            </div>
          </div>
          <template v-else>
            <div
              style="display: flex; flex-direction: column; align-items: center"
              v-for="t in Number(tacticsList[i - 2])"
              :key="t"
            >
              <div class="name">
                {{
                  teamPositions[i - 1][t - 1]["PlayerName"][0]["Description"]
                }}
              </div>
              <div class="player" :class="{ isHomeTeam: isHomeTeam }">
                {{ teamPositions[i - 1][t - 1].ShirtNumber }}
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

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
    flags: String,
    name: String,
  },
  computed: {
    line() {
      return this.tactics.split("-").length + 1;
    },
    tacticsList() {
      return this.tactics.split("-");
    },
    teamPositions() {
      const players = [].concat(this.players);
      const arr = { 0: [players[0]] };
      players.shift();
      this.tacticsList.forEach((t, index) => {
        let newArr = [];
        for (let j = 0; j < Number(t); j++) {
          newArr.push(players[0]);
          players.shift();
        }
        arr[index + 1] = newArr;
      });
      return arr;
    },
  },
  methods: {
    listGrid(i) {
      if (i === 1) return 1;
      return Number(this.tacticsList[i - 2]);
    },
  },
};
</script>

<style lang="scss" scoped>
.w-tactics {
  height: 440px;
  position: relative;
  img {
    width: 100%;
    height: 440px;
  }
  img.isHomeTeam {
    transform: rotateZ(180deg);
  }
  .info-team {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    padding: 24px;
    padding: 0 24px;
    height: 52px;
    width: 544px;
    bottom: 0;
    left: 0;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .info-team.isHomeTeam {
    top: 0;
    left: 0;
    bottom: unset;
  }
  .tactics-main {
    height: 388px;
    position: absolute;
    bottom: 52px;
    left: 0;
    width: 592px;
    display: flex;
    flex-direction: column-reverse;
  }
  .tactics-main.isHomeTeam {
    top: 52px;
    left: 0;
    bottom: unset;
    flex-direction: column;
  }
  .player-line {
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .player {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border: 2px solid #ffffff;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background: #004044;
  }
  .player.isHomeTeam {
    background: #e50013;
  }
  .name {
    font-size: 13px;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
  }
}
</style>
