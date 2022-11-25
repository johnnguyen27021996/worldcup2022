import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Group from "@/views/Group.vue";
import DetailMatch from "@/views/DetailMatch.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: {
      title: "Trang chủ",
    },
  },
  {
    path: "/groups",
    component: Group,
    name: "groups",
    meta: {
      title: "Bảng xếp hạng",
    },
  },
  {
    path: "/match/:id",
    component: DetailMatch,
    name: "match",
    meta: {
      title: "Trận đấu",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
