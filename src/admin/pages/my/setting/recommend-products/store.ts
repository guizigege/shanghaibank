import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../../../api/service/admin';
import storage from '@/utils/storage';
import { $Toast } from 'static/iview/base';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: storage.get('loginInfo'),
    products: []
  },
  mutations: {
    setLoginInfo(state, payload) {
      const { extendInfo } = state.loginInfo;
      const vm = JSON.parse(extendInfo);
      Object.assign(vm.userInfo, payload);
      state.loginInfo.extendInfo = JSON.stringify(vm);
      storage.set('loginInfo', state.loginInfo);
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    setRecommendProducts(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    getRecommendProducts({ commit }) {
      return new Promise(function(resolve) {
        service.recommendProducts().then(data => {
          commit('setRecommendProducts', data.rows);
          if (data.rows.length === 0) {
            $Toast({
              content: '没有产品可以推荐',
              type: 'warning'
            });
          }
          resolve();
        });
      });
    },
    saveInfo({ commit }, payload) {
      service.saveInfo(payload).then(() => {
        commit('setLoginInfo', payload);
        $Toast({
          content: '已修改'
        });
      }).catch(err => {
        $Toast({
          content: err,
          type: 'error'
        });
      });
    }
  }
});

export default store;
