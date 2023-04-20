import api from "@/api";
import Cookies from "js-cookie";
import Vue from "vue";
import router from "@/router";

// userData type
// bdate:"1999-03-30"
// card:null || number
// category:"game" || null
// city:"ffd"
// email:"dd@ff.rt"
// name:"Diana"
// phone:"79581780641"
// points:10
// referral_code:"ZGRAZmYucnQ="
// shared: true
// surname:"Zaharova"
// tests:2
// "points_prizes": {
//   "giftery_250": false,
//     "giftery_500": false,
//     "giftery_750": false,
//     "giftery_1000": false
// }

export const userModule = {
  state: () => ({
    user: null,
    receipts: [],
    transactions: [],
    prizes: null,
    isChoosePrize: true,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setReceipts(state, payload) {
      state.receipts = payload;
    },
    setPrizes(state, payload) {
      state.prizes = payload;
    },
    setIsChoosePrize(state, payload) {
      state.isChoosePrize = payload;
    },
    setTransactions(state, payload) {
      state.transactions = payload;
    },
    setTests(state, payload) {
      if (state.user && state.user.tests < 2) {
        state.user = { ...state.user, tests: payload };
      }
    },
    setCategory(state, payload) {
      if (state.user) {
        state.user = { ...state.user, category: payload };
      }
    },
  },
  getters: {
    isNotQuiz(state, getters) {
      return getters.isAuth ? state.user.tests === 0 : true;
    },
    isCanQuiz(state, getters) {
      return getters.isAuth ? state.user.tests < 2 : false;
    },
    isAuth(state) {
      return (
        state.user !== null &&
        Cookies.get("token") &&
        !!Object.keys(state.user).length
      );
    },
    isShared(state, getters) {
      return getters.isAuth ? state.user.shared : true;
    },
    isExchangePoints(state, getters) {
      if (getters.isAuth) {
        return Object.values(state.prizes).every((item) => item);
      }
      return false;
    },
  },
  actions: {
    delivery(_, payload) {
      return api.user.delivery(payload);
    },
    choosePrize(_, payload) {
      return api.user.choosePrize(payload);
    },
    getPrizes({ commit }) {
      return api.user
        .prizes()
        .then((res) => {
          console.log(res);
          commit("setPrizes", res.data);
        })
        .catch((e) => {
          console.error(e.response);
        });
    },
    goToTest() {
      // router.push(this.isCanQuiz ? "/quiz" : "/final");
      router.push("/quiz");
    },
    getReceipts({ commit }) {
      return api.user
        .receipts()
        .then((res) => {
          console.log(res);
          if (res.data.success && res.data.response.receipts) {
            commit("setReceipts", res.data.response.receipts);
          }
        })
        .catch((e) => {
          console.error(e.response);
        });
    },
    getTransactions({ commit }) {
      return api.user
        .transactions()
        .then((res) => {
          console.log(res);
          if (res.data.success && res.data.response.transactions) {
            commit("setTransactions", res.data.response.transactions);
          }
        })
        .catch((e) => {
          console.error(e.response);
        });
    },
    update(_, payload) {
      return api.user
        .update(payload)
        .then((res) => {
          if (res.data.success) {
            Vue.$toast.open({
              message: res.data.response.message,
              type: "success",
              duration: 6000,
            });
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    receipt(_, payload) {
      return api.user.receipt(payload);
    },
    feedback(_, payload) {
      return api.user.feedback(payload);
    },
    meta(_, payload) {
      return api.user.meta(payload).catch((e) => {
        console.error(e.response);
      });
    },
    resetPassword(_, payload) {
      return api.auth.forgot(payload).catch((e) => {
        Vue.$toast.open({
          message: e.response.data.response.message,
          type: "error",
          duration: 6000,
        });
        console.error(e.response);
      });
    },
    login(_, payload) {
      return api.auth.login(payload).then((res) => {
        const token = res.data.response.token;
        if (res.data.success && token) {
          Vue.$toast.open({
            message: `Вход прошел успешно!`,
            type: "success",
            duration: 6000,
          });
          if (Cookies.get("token")) Cookies.remove("token");
          Cookies.set("token", token, { expires: 365 });
          return res;
        }
      });
    },
    logout({ commit, state }) {
      if (Cookies.get("token") && state.user) Cookies.remove("token");
      commit("setUser", null);
      window.location.reload();
    },
    getUser({ commit }) {
      return api.user.getUserInfo().then((res) => {
        console.log(res);
        if (res.data.success && res.data.response.user) {
          commit("setUser", res.data.response.user);
        }
      });
    },
    prizeTimeout({ commit }) {
      setTimeout(() => {
        commit("setIsChoosePrize", true);
      }, 30000);
    },
  },
};
