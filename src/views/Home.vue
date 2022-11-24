<template>
  <div class="scheduled">
    <div
      class="w-scheduled"
      :class="'s-' + moment(match.datetime).format('DD-MM-YYYY')"
      v-for="(match, index) in matchesGroup"
      :key="index"
    >
      <div
        class="scheduled-title"
        :class="{
          today:
            moment().format('DD/MM/YYYY') ===
            moment(match.datetime).format('DD/MM/YYYY'),
        }"
      >
        Vòng đấu bảng - {{ moment(match.datetime).format("ddd, DD/MM") }}
      </div>
      <div class="scheduled-day">
        <template v-for="mat in match.data" :key="mat.id">
          <Match :match="mat"></Match>
        </template>
      </div>
    </div>
  </div>
  <img
    class="back-top"
    src="@/assets/back-to-top.png"
    alt=""
    @click="backToTop"
  />
</template>
<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import Match from "@/components/Match.vue";
import moment from "moment";
export default {
  components: { Match },
  setup() {
    const matches = ref([]);
    const matchesGroup = ref([]);
    const store = useStore();
    const teams = computed(() => store.state.teams.teams);
    const interval = ref(null);
    const getAllmatches = () => {
      axios.get("https://worldcupjson.net/matches").then((data) => {
        matches.value = data.data;
        matchesGroup.value = processData(
          data.data
            .filter((match) => match.stage_name === "First stage")
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        );
      });
    };
    const realTimeData = () => {
      interval.value = setInterval(() => {
        axios.get("https://worldcupjson.net/matches").then((data) => {
          matches.value = data.data;
          matchesGroup.value = data.data.filter(
            (match) => match.stage_name === "First stage"
          );
          matchesGroup.value = processData(matchesGroup.value);
        });
      }, 1000 * 60);
    };
    const processData = (data) => {
      const matches = [];
      if (data && data.length > 0) {
        data.forEach((item) => {
          if (matches.length === 0) {
            matches.push({
              datetime: item.datetime,
              data: [item],
            });
          } else {
            let index = matches.findIndex(
              (match) =>
                moment(match.datetime).format("DD/MM/YYYY") ===
                moment(item.datetime).format("DD/MM/YYYY")
            );
            if (index !== -1) {
              matches[index].data.push(item);
            } else {
              matches.push({
                datetime: item.datetime,
                data: [item],
              });
            }
          }
        });
      }
      return matches;
    };

    const backToTop = () => {
      const element = document.querySelector(".w-navbar");
      element.scrollIntoView({
        behavior: "smooth",
      });
    };

    return {
      matches,
      teams,
      getAllmatches,
      matchesGroup,
      interval,
      realTimeData,
      moment,
      backToTop,
    };
  },

  created() {
    this.getAllmatches();
  },
  mounted() {
    this.realTimeData();
    setTimeout(() => {
      const today = ".s-" + moment().format("DD-MM-YYYY");
      const element = document.querySelector(`${today}`);
      if (!element) return;
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 1000);
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      const el = document.querySelector(".back-top");
      if (!el) return;
      if (scroll > 800) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", () => {});
  },
};
</script>
<style lang="scss" scoped>
.scheduled {
  width: 752px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 40px;
  .w-scheduled {
    &:last-child {
      border-bottom: solid 1px #ebebeb;
    }
  }
  .scheduled-title {
    border: 1px solid #dadce0;
    background: #f8f9fa;
    padding: 12px 24px 10px;
    color: #202124;
    font-size: 14px;
    font-weight: 300;
  }
  .scheduled-title.today {
    background: #e8f3fc;
  }
  .scheduled-day {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-left: solid 1px #ebebeb;
    border-right: solid 1px #ebebeb;
    .w-match {
      &:nth-child(1) {
        border-right: solid 1px #ebebeb;
      }
      &:nth-child(3) {
        border-top: solid 1px #ebebeb;
        border-right: solid 1px #ebebeb;
      }
      &:nth-child(4) {
        border-top: solid 1px #ebebeb;
      }
    }
  }
}
.back-top {
  width: 32px;
  height: 32px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  transform: rotateZ(-90deg);
  opacity: 0;
  transition: all 0.5s ease;
}
.back-top.active {
  transform: rotateZ(0);
  opacity: 1;
}
</style>
