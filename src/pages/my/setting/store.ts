import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../api/service/admin';
import storage from '@/utils/storage';
import { $Toast } from 'static/iview/base';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: storage.get('loginInfo')
  },
  mutations: {
    setLoginInfo(state, payload) {
      Object.assign(state.loginInfo, payload);
      storage.set('loginInfo', state.loginInfo);
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    }
  },
  actions: {
    saveInfo({ commit }, payload) {
      return new Promise(function(resolve, reject) {
        service.saveInfo(payload).then(() => {
          commit('setLoginInfo', payload);
          resolve();
        }).catch(err => {
          $Toast({
            content: err,
            type: 'error'
          });
          reject(new Error(err));
        });
      });

    }
  }
});

export default store;
