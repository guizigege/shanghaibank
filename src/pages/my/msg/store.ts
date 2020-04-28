import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    list: [] as any,
    amount: 0,
    subAmount: 0
  },
  mutations: {
    clearList(state) {
      state.list = [];
    },

    clean(state) {
      state.list = [];
      state.amount = 0;
      state.subAmount = 0;
    },

    updateData(state, payload) {
      state.list = state.list.concat(payload.rows);
      state.amount = payload.amount;
      state.subAmount = payload.subAmount;
    }
  },
  actions: {
    // 消息列表
    async getList({ state, commit }, payload) {
      const ret = await service.getMsgList(payload);
      commit('updateData', ret);
    }
  }
});

export default store;
