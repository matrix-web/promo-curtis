import api from "@/api";

export const winnersModule = {
  state: () => ({
    winners: null,
    prizes: [],
  }),
  mutations: {
    setWinners(state, payload) {
      state.winners = payload;
    },
    setPrizes(state, payload) {
      state.prizes = payload;
    },
  },
  getters: {},
  actions: {
    getWinners({ commit }, payload) {
      return api.winners
        .winners(payload)
        .then((res) => {
          console.log(res);
          commit("setWinners", res.data);
        })
        .catch((e) => {
          console.error(e.response);
        });
    },
    getPrizes({ commit }) {
      return api.winners
        .prizes()
        .then((res) => {
          console.log(res);
          if(res.data.success) {
            // Vue.$toast.open({
            //   message: res.data.response.message,
            //   type: "success",
            //   duration: 6000,
            // });
            commit("setPrizes", res.data.response.prizes);
          }
        })
        .catch((e) => {
          console.error(e.response);
        });
    },
  },
};
