import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import { $Toast } from 'static/iview/base';
import storage from '@/utils/storage';

Vue.use(Vuex as any);

const EmptyBusiness = [{ businessType: 0, content: '' }];

const store = new Vuex.Store({
  state: {
    loading: true,
    business: EmptyBusiness,
    manages: [],
    loginInfo: storage.get('loginInfo')
  },
  mutations: {
    initBusinessTypes(state, payload) {
      state.business = payload;
    },
    initManages(state, payload) {
      state.manages = payload;
    },
    clearManages(state, payload) {
      state.manages = [];
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    }
  },
  actions: {
    initBusinessTypes({ dispatch, commit }) {
      return new Promise(function(resolve) {
        service.businessTypes().then(async data => {
          commit('initBusinessTypes', data);
          await dispatch('getOfficeManageList', [data[0].businessType.toString()]);
          resolve();
        });
      });
    },
    getOfficeManageList({ commit, state }, payload) {
      state.loading = true;
      return new Promise(function(resolve) {
        commit('getLoginInfo');
        const req = {
          businessType: payload,
          head: state.loginInfo.head,
          office: state.loginInfo.office,
          branch: state.loginInfo.branch
        };
        commit('clearLoginInfo');
        commit('clearManages');
        service.getOfficeManageList(req).then(res => {
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
          state.loading = false;
          commit('initManages', data);
          resolve();
        });

      });
    }
  }
});

export default store;
