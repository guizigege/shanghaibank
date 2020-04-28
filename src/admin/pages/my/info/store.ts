import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../../api/service/admin';
import { $Toast } from 'static/iview/base';
import storage from '@/utils/storage';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: storage.get('loginInfo')
  },
  mutations: {
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    setLoginInfo(state, payload) {
      Object.assign(state.loginInfo, payload);
      storage.set('loginInfo', state.loginInfo);
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    }
  },
  actions: {
    saveInfo({ commit }, payload) {
      service.saveInfo(payload).then(() => {
        commit('setLoginInfo', payload);
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
