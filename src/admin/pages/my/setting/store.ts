import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../../api/service/admin';
import storage from '@/utils/storage';
import { $Toast } from 'static/iview/base';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: storage.get('loginInfo'),
    red: {
      money: 0, // 起发金额
      average: 0, // 红包均额
      limit: 0, // 日领上限
      limitMoney: 0, // 上限额度
      IntervalDays: '', // 间隔天数
      rate: 0, // 佣金比例
      office: {
        isLimit: true,
        IntervalDays: '',
        count: ''
      }, // 同一网点
      redPacket: {
        isLimit: true,
        IntervalDays: '',
        count: ''
      }, // 同一红包
      product: {
        isLimit: true,
        IntervalDays: '',
        count: ''
      },
      active: {
        isLimit: true,
        IntervalDays: '',
        count: ''
      }
    }
  },
  mutations: {
    setLoginInfo(state, payload) {
      const { extendInfo } = state.loginInfo;
      const vm = JSON.parse(extendInfo);
      Object.assign(vm.userInfo, payload);
      state.loginInfo.extendInfo = JSON.stringify(vm);
      storage.set('loginInfo', state.loginInfo);
    },
    getLoginInfo(state) {
      state.loginInfo = storage.get('loginInfo');
    },
    clearLoginInfo(state) {
      state.loginInfo = {};
    },
    getRed(state, payload) {
      const d = JSON.parse(payload.condition);
      for (let i in d) {
        if (i !== 'IntervalDays' && d[i] === '') {
          d[i] = 0;
        }
      }
      Object.assign(state.red, d);
    },
    setRed(state, payload) {
      Object.assign(state.red, payload);
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
    },
    getRed({ commit }) {
      return new Promise(function(resolve) {
        service.getRed().then((res) => {
          commit('getRed', res);
          resolve();
        });
      });
    },
    setRed({ commit }, payload) {
      return new Promise(function(resolve) {
        service.setRed({ condition: JSON.stringify(payload) }).then(() => {
          commit('setRed', payload);
        });
        resolve();
      });
    }
  }
});

export default store;
