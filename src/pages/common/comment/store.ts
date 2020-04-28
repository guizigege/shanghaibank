import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import client from '@/api/service/client';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    officeRange: [] as any,
    productRange: [] as any,
    list: [] as any,
    amount: 0,
    subAmount: 0
  },
  mutations: {
    clearList(state) {
      state.list = [];
    },

    clean(state) {
      state.officeRange = [];
      state.productRange = [];
      state.list = [];
      state.amount = 0;
      state.subAmount = 0;
    },

    updateOfficeRange(state, payload) {
      state.officeRange = payload.rows;
    },

    updateProductRange(state, payload) {
      state.productRange = payload.rows;
    },

    updateList(state, payload) {
      state.list = [...state.list, ...payload.rows];
      state.subAmount = payload.subAmount;
      state.amount = payload.amount;
    }
  },
  actions: {
    // 网点列表
    async getOfficeRange({ commit }) {
      const ret = await service.getCommonOfficeList();
      commit('updateOfficeRange', ret);
    },

    // 产品列表
    async getProductRange({ commit }, payload) {
      const ret = await service.getCommonProductList(payload);
      commit('updateProductRange', ret);
    },

    // 评论列表
    async getComment({ commit }, payload) {
      const ret = await client.productComments(payload);
      commit('updateList', ret);
    }
  }
});

export default store;
