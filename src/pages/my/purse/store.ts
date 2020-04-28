import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex as any);
import auth from '../../../api/auth';
import service from '../../../api/service/client';
const store = new Vuex.Store({
  state: {
    money: '0.00',
    withdrawMoney: '5',
    userInfo: {
      userName: ''
    } as any,
  },
  mutations: {
    money(state, payload) {
      state.money = payload.toFixed(2);
    },
    selectMoney(state, payload) {
      state.withdrawMoney = payload;
    },
    userInfo(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    withdraw({ state, dispatch },payload) {
      if (!(state.userInfo.mobile)) {
        wx.showToast({
          title: '请绑定手机号...',
          icon: 'loading'
        });
      } else {
        service.costRed(payload).then(res => {
          wx.showToast({
            title: '提现成功！',
            icon: 'loading'
          });
          dispatch('money').catch(err => console.log(err));
        }).catch(() => {
          wx.showToast({
            title: '余额不足...',
            icon: 'loading'
          });
        });
      }

    },
    async money({ commit }) {
      let money = await service.myCash();
      commit('money',money);
    },
    async userInfo({ state, commit }) {
      let userInfo = await service.getClientInfo({ userId: auth.loginInfo.userId });
      commit('userInfo', userInfo)
    }
  }
});
export default store;
