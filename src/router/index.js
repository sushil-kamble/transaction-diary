import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "@/firebase/init.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/components/auth/Auth.vue")
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: () =>
      import(/* webpackChunkName: "transfer" */ "../views/Transfer.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/logs",
    name: "Logs",
    component: () => import(/* webpackChunkName: "log" */ "../views/Logs.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/friends",
    name: "Friends",
    component: () =>
      import(/* webpackChunkName: "friends" */ "../views/Friends.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/friends/",
    name: "Friend",
    props: true,
    component: () =>
      import(/* webpackChunkName: "perFriend" */ "../views/Friend.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/find-friends",
    name: "FindFriends",
    component: () =>
      import(/* webpackChunkName: "find-friends" */ "../views/FindFriends.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("auth");
  } else {
    next();
  }
});

export default router;
