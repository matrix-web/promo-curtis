import Vue from "vue";
import Vuex from "vuex";
import { userModule } from "@/store/userModule";
import { testModule } from "@/store/testModule";
import { winnersModule } from "@/store/winnersModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userModule: {
      namespaced: true,
      ...userModule,
    },
    testModule: {
      namespaced: true,
      ...testModule,
    },
    winnersModule: {
      namespaced: true,
      ...winnersModule,
    },
  },
});
