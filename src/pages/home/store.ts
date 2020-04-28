import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/client';
import { deepClone, equals } from '@/utils/index';
import { ProductType } from '@/models/enums';
import { Product } from '@/models/product';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    loading: true,
    filter: {
      la: 0,
      lo: 0,
      range: 3000,
      type: ProductType.优品,
      searchStr: ''
    },
    list: {
      superior: new Array<Product>(),
      promotion: new Array<Product>()
    }
  },
  mutations: {
    filterChange(state, payload) {
      state.filter = { ...state.filter, ...payload };
    },
    initSuperior(state, payload) {
      state.list.superior = payload;
    },
    initPromotion(state, payload) {
      state.list.promotion = payload;
    }
  },
  actions: {
    async getData({ state, commit }, payload) {
      state.loading = true;
      const prev = deepClone(state.filter);
      commit('filterChange', payload);

      if (equals(prev, state.filter) === false) {
        // 查询条件变化后，重新查询
        const list = await service.productList(state.filter);
        state.loading = false;
        if (state.filter.type === ProductType.优品) {
          commit('initSuperior', list);
        } else if (state.filter.type === ProductType.活动) {
          commit('initPromotion', list);
        }
      }else {
        state.loading = false;
      }
    }
  }
});

export default store;
