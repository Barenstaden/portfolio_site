import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  {
    path: "/album",
    name: "Alle album",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/Album.vue"),
  },
  {
    path: "/album/:album",
    name: "Album",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/Album.vue"),
  },
  {
    path: "/album/:album/:image",
    name: "Bilde",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/Album.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
