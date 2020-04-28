import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../api/service/admin';
import { EnumValues } from '@/utils/enum-values';
import { SignUpType } from '@/models/enums';
import storage from '@/utils/storage';
import { isValidJSON } from '@/utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    step: 0,
    signUpInfo: {
      submitType: '',
      head: '',
      branch: '',
      office: '',
      manager: '',
      submitInfo: {}
    },
    bankList: [],
    businessTypes: []
  },
  mutations: {
    onNext(state) {
      state.step += 1;
    },

    onPrev(state) {
      state.step = state.step > 0 ? state.step - 1 : 0;
    },

    onSignUpTypeChanged(state, payload) {
      state.signUpInfo.submitType = payload;
    },

    initBankList(state, payload) {
      state.bankList = payload.filter(c => !!c);
    },

    initBusinessTypes(state, payload) {
      state.businessTypes = payload;
    },

    selectedOffice(state, payload) {
      state.signUpInfo.office = payload;
    },

    initEditInfo(state) {
      const info = storage.get('loginInfo');
      if (info) {
        state.step = 0;
        state.signUpInfo = {
          submitType: EnumValues.getNameFromValue(
            SignUpType,
            info.submitType
          ) as string,
          head: info.head,
          branch: info.branch,
          office: info.office,
          manager: info.manager,
          submitInfo: isValidJSON(info.submitInfo)
            ? JSON.parse(info.submitInfo)
            : {}
        };
      }
    }
  },
  actions: {
    onSubmit({ state }, payload) {
      Object.assign(state.signUpInfo.submitInfo, payload);

      const submitType = SignUpType[state.signUpInfo.submitType];
      const office =
        submitType === SignUpType.网点
          ? state.signUpInfo.submitInfo['bankName']
          : state.signUpInfo.office || '';
      const manager = state.signUpInfo.submitInfo['name'] || '';
      const params = { ...state.signUpInfo, submitType, office, manager };

      return new Promise((resolve, reject) => {
        service
          .bankSignUp(params)
          .then(() => {
            resolve('success');
          })
          .catch(err => reject(err));
      });
    },
    initBankList({ commit }) {
      service.bankList().then(data => {
        commit('initBankList', data);
      });
    },
    initBusinessTypes({ commit }) {
      service.businessTypes().then(data => {
        commit('initBusinessTypes', data);
      });
    }
  }
});

export default store;
