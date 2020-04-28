import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/client';
import { handleError } from '@/utils';

Vue.use(Vuex as any);
const store = new Vuex.Store({
  state: {
    loading: true,
    list: [] as any,
    isEnd: false
  },
  mutations: {
    updateList(state, payload) {
      if (payload.rows.length > 0) {
        state.list = [...state.list, ...payload.rows];
      } else {
        state.isEnd = true;
      }
    },
    clearList(state) {
      state.list = [];
    }
  },
  actions: {
    async getOrderList({ state, commit }, payload) {
      state.loading = true;
      let res = await service.getOrderList(payload).catch(handleError);
      state.loading = false;
      commit('updateList', res);
    }
  }
});
export default store;
