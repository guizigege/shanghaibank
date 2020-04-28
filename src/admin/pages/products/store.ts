import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import storage from '@/utils/storage';
import { ProductType, ProductAuditState } from '@/models/enums';
import { Product, emptyProduct, emptyProductDetail } from '@/models/product';
import { deepClone, unionWith } from '@/utils/index';

Vue.use(Vuex as any);

const product: Product = {
  productType: ProductType.优品,
  title: '',
  content: '',
  imageUrl: '',
  linkUrl: '',
  otherUrl: '',
  beginTime: '',
  endTime: '',
  address: '',
  extendInfo: '',
  managerUserId: '',
  groupSum: 0,
  groupTime: 0,
  state: ProductAuditState.草稿,
  personLook: 0,
  groupNum: 0,
  groupBuy: 0,
  status: ProductAuditState.草稿,
  bankInfo: ''
};

function getBankInfo(): string {
  const loginInfo = storage.get('loginInfo');
  if (loginInfo && loginInfo.extendInfo) {
    const ex = JSON.parse(loginInfo.extendInfo);
    return JSON.stringify({
      avatar: loginInfo.icon,
      weekday: `${ex.userInfo.weekdayAmStartHour} ~ ${ex.userInfo.weekdayAmEndHour} ${ex.userInfo.weekdayPmStartHour} ~ ${ex.userInfo.weekdayPmEndHour}`,
      holiday: `${ex.userInfo.holidayAmStartHour} ~ ${ex.userInfo.holidayAmEndHour} ${ex.userInfo.holidayPmStartHour} ~ ${ex.userInfo.holidayPmEndHour}`
    });
  } else {
    return '';
  }
}

function initBankInfo(product) {
  product.bankInfo =
    product && product.bankInfo ? product.bankInfo : getBankInfo();
}

function initUnionList(tmpList, tmp) {
  return unionWith(tmpList, tmp, union).sort(sortBy);
}

function union(a, b) {
  return a.productId === b.productId;
}

function sortBy(a, b) {
  return (+b.productId) - (+a.productId);
}

const store = new Vuex.Store({
  state: {
    loading: true,
    form: {
      product: emptyProduct,
      anyError: true,
      managers: []
    },
    detail: emptyProductDetail,
    list: [],
    officeList: [],
    productType: ProductType.优品,
    selectedOffice: 0,
    search: ''
  },
  mutations: {
    initOfficeList(state, payload = []) {
      state.officeList = payload.map(item => ({ office: item }));
    },

    initProduct(state, type: ProductType) {
      state.form.product = deepClone(emptyProduct);
      initBankInfo(state.form.product);
      state.form.product.productType = type;
    },

    initList(state, payload) {
      state.list = payload.list.length ? initUnionList(payload.list, state.list) as any : [];
    },

    initDetail(state, payload) {
      if (payload.product) {
        initBankInfo(payload.product);
        state.detail = deepClone(payload);
      } else {
        initBankInfo(payload);
        state.detail.product = deepClone(payload);
      }
    },

    initEditItem(state, payload) {
      initBankInfo(payload);
      state.form.product = deepClone(payload);
    },

    initManagers(state, payload) {
      state.form.managers = payload || [];
    },

    updateImageUrl(
      state,
      payload: { url: string; target: 'imageUrl' | 'linkUrl' | 'otherUrl' }
    ) {
      state.form.product[payload.target] = payload.url;
    },

    setValidProduct(state, payload: { product: Product }) {
      state.form.anyError = false;
      state.form.product = payload.product;
    },

    setFormError(state) {
      state.form.anyError = true;
    },

    setProductType(state, payload) {
      state.productType = payload;
    },

    setSearch(state, payload) {
      state.search = payload;
    },

    setSelectedOffice(state, payload) {
      state.selectedOffice = payload || 0;
    },

    resetList(state) {
      state.list = [];
    }
  },
  actions: {
    async initOfficeList({ commit }) {
      const officeList = await service.bankList();
      commit('initOfficeList', officeList);
    },
    async initList({ state, commit }, payload) {
      state.loading = true;
      const list = await service.productList({ ...payload });
      state.loading = false;
      commit('initList', { ...payload, list });
    },
    async initDetail({ state, commit }, payload) {
      const product = payload ? payload.info : state.form.product;
      if (
        product.status !== ProductAuditState.草稿 ||
        (product.status === ProductAuditState.草稿 && product.productId)
      ) {
        const origin = await service.productDetail({
          productId: product.productId
        });

        // 编辑直接预览
        if (!payload) {
          origin.product = { ...origin.product, ...product };
        }
        commit('initDetail', origin);
      } else {
        commit('initDetail', product);
      }
    },
    async submit({ state }) {
      const draft = await service.saveProduct(state.form.product);
      if (draft) {
        await service.submitProduct(draft.productId);
      }

      return true;
    },
    save({ state }) {
      return service.saveProduct(state.form.product);
    },
    async initManagers({ commit }) {
      const managers = await service.officeManagers();
      commit('initManagers', managers);
    }
  }
});

export default store;
