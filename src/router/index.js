import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Group from "@/views/Group.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
