import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/client';
import { deepClone, equals } from '@/utils/index';
import { BankInfo } from '@/models/bank';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    loading: true,
    filter: {
      la: 0,
      lo: 0,
      range: 3000,
      office: ''
    },
    list: new Array<BankInfo>(),
    allList: new Array<BankInfo>(),
    recommendList: new Array<{
      location: string;
      office: string;
    }>()
  },
  mutations: {
    filterChange(state, payload) {
      state.filter = { ...state.filter, ...payload };
    },
    initList(state, payload) {
      state.list = payload.list;
      state.recommendList = payload.recommendList;
    },
    initAllList(state, payload) {
      state.allList = payload;
    },
    clearAllList(state) {
      state.allList = new Array<BankInfo>();
    },
    clearList(state) {
      state.list = [];
      state.recommendList = [];
    }
  },
  actions: {
    async getData({ state, commit }, payload) {
      state.loading = true;
      const prev = deepClone(state.filter);
      commit('filterChange', payload);

      if (!equals(prev, state.filter)) {
        // 查询条件变化后，重新查询
        const info = await service.getVicinityBankInfo(state.filter);
        state.loading = false;
        // 先将list,recommendList清空
        commit('clearList');
        commit('initList', { list: info[0], recommendList: info[1] });
      }
    },
    async getAllBank({ state, commit }, payload) {
      const info = await service.getRangeBankList(payload);

      // console.log(info);

      commit('initAllList', info.rows);
    }
  }
});

export default store;
