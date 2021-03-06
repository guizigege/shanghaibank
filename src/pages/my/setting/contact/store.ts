import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../../api/service/admin';
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
    clearLoginInfo(state) {
      state.loginInfo = {};
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    }
  },
  actions: {
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
