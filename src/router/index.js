import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Repo from "../views/Repo.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/repo/:id", name: "Repo", component: Repo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
