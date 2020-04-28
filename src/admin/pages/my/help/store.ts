import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';

Vue.use(Vuex as any);

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
    },

    delList(state, payload) {
      state.list = state.list.filter(c => c.noticeId !== payload.noticeId);
    }
  },
  actions: {
    // 帮助列表
    async getList({ commit }, payload) {
      const ret = await service.getHelpList(payload);
      commit('updateData', ret);
    },
    // 增加帮助
    async addHelp({ commit }, req) {
      await service.addHelp(req);
    },
    // 删除帮助
    // async delHelp({ commit }, payload) {
    //   await service.delHelp(payload);
    //   commit('delList', payload);
    // },
    // 编辑帮助
    // async editHelp({ commit }, payload) {
    //   await service.editHelp(payload);
    // }
  }
});

export default store;
