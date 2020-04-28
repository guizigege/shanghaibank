import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/client';
import { ManagerList, RangeBankList } from '@/models/manager';
import { businessType } from '@/models/enums';
import { formatDate } from '@/utils';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    loading: true,
    currentBank: {
      address: '',
      branch: '',
      distance: 0,
      gender: 0,
      head: '',
      icon: '',
      location: {
        name: '',
        address: '',
        latitude: '',
        longitude: ''
      },
      mobile: '',
      office: '',
      userName: '',
      wxNumber: ''
    },
    place: {
      lo: 0,
      la: 0,
      range: 3000
    },
    bank: {
      head: '',
      branch: '',
      office: '',
      businessType: [businessType.personal]
    },
    managerInfo: {} as any,
    list: {
      bank: new Array<RangeBankList>(),
      manager: new Array<ManagerList>()
    }
  },
  mutations: {
    currentTab: (state, payload) => {
      state.bank.businessType = payload;
    },
    currentLocation: (state, payload) => {
      state.place.la = payload.la;
      state.place.lo = payload.lo;
    },
    currentBank: (state, payload) => {
      state.bank.head = payload.head;
      state.bank.branch = payload.branch;
      state.bank.office = payload.office;
      if(payload.businessType) {
        state.bank.businessType = payload.businessType;
      }
      state.currentBank = { ...payload, distance: +(payload.distance / 1000).toFixed(2) };
    },
    currentBankList: (state, payload) => {
      state.list.bank = payload.rows;
    },
    currentManagerList: (state, payload) => {
      state.list.manager = payload.rows;
    },
    currentManagerInfo: (state, payload) => {
      state.managerInfo = payload;
    }
  },
  actions: {
    async getRangeBankListData({ state, commit, dispatch }, payload) {
      commit('currentLocation', payload);
      let bankList = await service.getRangeBankList(state.place);
      commit('currentBankList', bankList);
      if(bankList.rows.length>0){
        commit('currentBank',bankList.rows[0]);
        console.log('currentBank[0]:',bankList.rows[0]);
        console.log('getRangeBankList[0]:',state.bank);
        dispatch('getManagerListData',state.bank);
      }else{
        state.list.manager = [];
        state.currentBank.distance = 0;
        state.loading = false;
      }
    },
    async getManagerListData({ state, commit }, payload) {
      commit('currentManagerList', {rows: []});
      state.loading = true;
      let managerList = await service.getManagerList(payload);
      state.loading = false;
      const len = managerList.rows.length;
      for (let i = 0; i < len; i++) {
        (managerList.rows)[i]['ex'] = JSON.parse((managerList.rows)[i]['extendInfo']);
        managerList.rows[i]['signature'] = managerList.rows[i]['ex']['userInfo']['signature'];
      }
      commit('currentManagerList', managerList);
    },
    async getManagerInfoData({ state, commit }, payload) {
      return new Promise(async function(resolve) {
        let managerInfo = await service.getManagerInfo(payload);
        managerInfo.ex = JSON.parse(managerInfo['extendInfo']);
        managerInfo.tags = managerInfo.ex.userInfo.tags;
        managerInfo.name = managerInfo.userName;
        managerInfo.signature = managerInfo.ex.userInfo.signature;
        managerInfo.focusState = managerInfo.friendingState;
        managerInfo.hasProduct = 'productId' in managerInfo.productInfo;
        if ('productId' in managerInfo.productInfo) {
          managerInfo.productInfo.beginTime = formatDate(managerInfo.productInfo.beginTime);
          managerInfo.productInfo.endTime = formatDate(managerInfo.productInfo.endTime);
        }
        commit('currentManagerInfo', managerInfo);
        resolve();
      });
    }
  }
});
export default store;
