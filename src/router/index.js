import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("redirect") !== null) {
        const redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        next(redirect);
      } else {
        next();
      }
    },
  },
  {
    path: "/duties",
    name: "Duties",
    component: () => import(/* webpackChunkName: "duties" */ "../views/Duties.vue"),
  },
  {
    path: "/questlines",
    name: "Questlines",
    component: () => import(/* webpackChunkName: "questlines" */ "../views/Questlines.vue"),
  },
  {
    path: "/checklist",
    name: "Checklist",
    component: () => import(/* webpackChunkName: "checklist" */ "../views/Checklist.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "Dashboard",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
