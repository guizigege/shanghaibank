  import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import { formatMoney } from '@/utils'
Vue.use(Vuex as any);
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
const store = new Vuex.Store({
  state: {
    loading: true,
    cash: '0.00',
    tips : {
      /** 充值详情说明 */
      recharge: [
        '单次充值金额不超过10000元',
        '每日累计充值金额不超过50000元',
        '微信充值，24小时到账',
        '若充值失败，将会退回原账户',
        '若遇到法定节假日、公休日、到账日期顺延',
        '系统默认将钱打入授权登入小程序的微信账户'
      ],
      /** 提现详情说明 */
      withdraw: [
        '每日可提现一次',
        '提现将直接打入微信零钱',
        '微信充值，24小时到账',
        '若充值失败，将会退回原账户',
        '若遇到法定节假日、公休日、到账日期顺延',
        '系统默认将钱打入授权登入小程序的微信账户'
      ],
    },
    redList: [] as any,
    redInfo: {} as any,
    logList: [] as any,
    productList: [] as any,
    walletList: [] as any
  },
  mutations: {
    myCash(state, payload) {
      state.cash = formatMoney(payload);
    },
    redList(state, payload) {
      state.redList = payload;
    },
    redInfo(state, payload) {
      state.redInfo = payload;
      state.productList = payload.products.map(val => {
        let len = val.log.length;
        let sum = 0;
        if (len === 0) {
          sum = 0;
        } else {
          for (let i = 0; i < len; i++) {
            sum += val.log[i].money;
          }
        }
        val.sumMoney = sum;
        return val;
      });
      let logList = payload.products.map(val => {
        return val.log;
      });
      state.logList = flatten(logList);
    },
    walletList(state, payload) {
      state.walletList = payload;
    }
  },
  actions: {
    // 余额
    async myCash({ commit }) {
      let cash = await service.myCash();
      commit('myCash',cash);
    },
    // 发放的红包列表
    async redList({state, commit }, payload) {
      state.loading = true;
      let redList = await service.getRedList();
      state.loading = false;
      commit('redList',redList);
    },
    // 红包详情
    async redInfo({ commit }, payload) {
      let redInfo = await service.getRedInfo(Number(payload));
      commit('redInfo',redInfo);
    },
    // 提现
    async withdraw({ dispatch }, payload) {
      service.costRed();
      await dispatch('myCash');
    },
    // 提现明细
    async withdrawList({state, commit }, payload) {
      commit('walletList', []);
      state.loading = true;
      let walletList = await service.getWithdrawList();
      state.loading = false;
      commit('walletList', walletList);
    },
    // 充值
    async recharge({ dispatch }, payload) {
      return service.recharge(payload);
    }
  },

});

export default store;
