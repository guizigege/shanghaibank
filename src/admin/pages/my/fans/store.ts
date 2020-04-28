import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import storage from '@/utils/storage';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    loading: true,
    list: [] as any,
    amount: 0,
    subAmount: 0,
    res: {} as any,
    loginInfo: storage.get('loginInfo')
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
      state.res = payload;
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },

    clearLoginInfo(state) {
      state.loginInfo = {};
    }
  },
  actions: {
    // 粉丝列表
    async fanList({state, commit }, payload) {
      state.loading = true;
      const ret = await service.fanList(payload);
      state.loading = false;
      commit('updateData', ret);
    }
  }
});

export default store;
