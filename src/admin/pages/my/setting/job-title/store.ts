import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../../../api/service/admin';
import storage from '@/utils/storage';
import { $Toast } from 'static/iview/base';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: storage.get('loginInfo'),
    business: []
  },
  mutations: {
    setLoginInfo(state, payload) {
      const { extendInfo } = state.loginInfo;
      const vm = JSON.parse(extendInfo);
      Object.assign(vm.userInfo, { title: payload.title }); // title在extendInfo.userInfo里
      state.loginInfo.extendInfo = JSON.stringify(vm);
      state.loginInfo.businessType = payload.businessType; // businessType在loginInfo里
      storage.set('loginInfo', state.loginInfo);
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    initBusinessTypes(state, payload) {
      state.business = payload;
    }
  },
  actions: {
    initBusinessTypes({ commit }) {
      return new Promise(function(resolve) {
        service.businessTypes().then(data => {
          commit('initBusinessTypes', data);
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
