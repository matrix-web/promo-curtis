import api from "@/api/index";
import { quiz } from "@/mocks/questions";

export const testModule = {
  state: () => ({
    quiz,
    answers: [],
    currentQuestionId: 0,
  }),
  mutations: {
    setAnswer(state, data) {
      state.answers = data;
    },
    setCurrentQuestion(state, data) {
      state.currentQuestionId = data;
    },
  },
  getters: {
    isTestFinished(state) {
      return state.quiz.length === state.answers.length;
    },
    progress(state) {
      const part = 100 / state.quiz.length;
      return part * (state.currentQuestionId + 1);
    },
    currentQuestion(state) {
      return state.quiz[state.currentQuestionId];
    },
  },
  actions: {
    finishTest({ state, rootState, commit }) {
      const categories = state.answers.map((item) => item.value);
      const categoriesCount = {};
      categories.forEach((item) => {
        if (categoriesCount[item] !== undefined) ++categoriesCount[item];
        else categoriesCount[item] = 1;
      });
      let category;
      let categoryCount = 0;

      for (const [key, value] of Object.entries(categoriesCount)) {
        if (categoryCount <= value) {
          category = key;
          categoryCount = value;
        }
      }
      const results = state.answers
        .map((item) => {
          if (item.value === category) return item.text;
        })
        .filter((item) => item)
        .join(",");
      console.log({ category, results });

      console.log(rootState)
      commit("userModule/setCategory", category, { root: true });
      if (rootState.userModule.user)
        commit("userModule/setTests", rootState.userModule.user?.tests + 1, { root: true });

      return api.user.sendTest({ category, results });
    },
    answer({ commit, state }, payload) {
      commit("setAnswer", [...state.answers, payload]);
    },
    nextQuestion({ commit, state }) {
      commit("setCurrentQuestion", (state.currentQuestionId += 1));
    },
    initialState({ commit }) {
      commit("setAnswer", []);
      commit("setCurrentQuestion", 0);
    },
  },
};
