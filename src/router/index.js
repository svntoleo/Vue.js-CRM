import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "auth" },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Record.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiredAuth = to.matched.some((record) => record.meta.auth);

  if (requiredAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
