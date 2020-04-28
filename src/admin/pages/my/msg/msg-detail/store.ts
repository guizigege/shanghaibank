import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import storage from '@/utils/storage';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    list: [] as any,
    amount: 0,
    subAmount: 0,
    loginInfo: storage.get('loginInfo'),
    res: {} as any
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
      state.list = payload.rows.concat(state.list);
      state.amount = payload.amount;
      state.subAmount = payload.subAmount;
      state.res = payload;
    },
    updateList(state, payload) {
      state.list = state.list.concat(payload);
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    }
  },
  actions: {
    // 消息详情列表
    async getDetailList({ commit }, payload) {
      const ret = await service.getMsgDetailList(payload);
      commit('updateData', ret);
    },
    // 发消息
    async sendMsg({ commit }, payload) {
      const ret = await service.sendMsg(payload);
      const { messageId, sendId, userId, content } = ret;
      commit('updateList', [{ messageId, sendId, userId, content }]);
    }
  }
});

export default store;
