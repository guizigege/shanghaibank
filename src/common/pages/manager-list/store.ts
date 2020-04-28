import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import { $Toast } from 'static/iview/base';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    manages: [],
  },
  mutations: {
    initManages(state, payload) {
      state.manages = payload;
    },
    clearManages(state) {
      state.manages = [];
    }
  },
  actions: {
    getOfficeManageList({ commit }, payload) {
      return new Promise(function(resolve) {
        commit('clearManages');
        service.getOfficeManageList(payload).then(res => {
          const data = res.rows.map(c => {
            c.ex = JSON.parse(c.extendInfo);
            c.name = c.userName;
            c.signature = c.ex.userInfo.signature;
            c.tags = c.ex.userInfo.tags;
            c.frontCoverUrl = c.ex.userInfo.frontCoverUrl;
            c.bigFrontCoverUrl = c.bigFrontCoverUrl ? c.ex.userInfo.bigFrontCoverUrl : c.frontCoverUrl;
            c.mobilePhone = c.mobile;
            c.avatarUrl = c.icon;
            return c;
          });
          commit('initManages', data);
          resolve();
        });

      });
    }
  }
});

export default store;
