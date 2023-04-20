import Vue from "vue";
import VueRouter from "vue-router";
import Quiz from "@/views/Quiz.vue";
import Final from "@/views/Final";
import PromoMagnit from "@/views/PromoMagnit";
import Account from "@/views/Account";
import Winners from "@/views/Winners";
import NationalPromo from "@/views/NationalPromo";

import {
  authMiddleware,
  finalMiddleware,
  testLimitMiddleware,
} from "./middleware";
import Drop from "@/views/Drop";

Vue.use(VueRouter);

const routes = [
  {
    path: "/quiz",
    name: "quiz",
    component: Quiz,
    meta: {
      testLimit: true,
    },
  },
  {
    path: "/magnit-promo",
    name: "promo-magnit",
    component: PromoMagnit,
  },
  {
    path: "/",
    name: "national",
    component: NationalPromo
  },
  {
    path: "/account",
    name: "account",
    component: Account,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/winners",
    name: "winners",
    component: Winners,
    meta: {},
  },
  {
    path: "/final",
    name: "final",
    component: Final,
    meta: {
      authRequired: true,
      final: true,
    },
  },
  {
    path: "/drop",
    name: "drop",
    component: Drop,
    meta: {},
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: function (to) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(authMiddleware);
router.beforeEach(testLimitMiddleware);
router.beforeEach(finalMiddleware);

export default router;
