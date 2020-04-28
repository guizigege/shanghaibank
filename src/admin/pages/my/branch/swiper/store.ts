import { deepClone } from '@/utils/index';
import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/api/service/admin';
import { SwiperType } from '@/models/enums';

Vue.use(Vuex as any);

const emptySwiper = {
  bannerId: -1,
  name: '',
  imageUrl: '',
  office: '',
  productId: -1,
  type: 0,
  index: 0,
  beginTime: '',
  endTime: '',
  status: 0
};

const store = new Vuex.Store({
  state: {
    type: SwiperType.Home,
    list: [],
    form: {
      item: emptySwiper,
      officeList: [],
      productList: []
    },
    detail: emptySwiper
  },
  mutations: {
    initType(state, payload) {
      state.type = payload;
    },
    setValidEntity(state, payload) {
      state.form.item = payload.item;
    },
    clearList(state) {
      state.list = [];
    }
  },
  actions: {
    async initList({ state }) {
      const list = await service.getSwiperList(state.type);

      state.list = list;
    },
    async initAddForm({ state, commit }) {
      const officeList = await service.bankList();

      state.form.item = { ...deepClone(emptySwiper), type: state.type };

      state.form.officeList = officeList;

      if (officeList && officeList.length > 0) {
        state.form.productList = await service.getProductsByOfficeName(
          officeList[0]
        );
      }
    },
    async initOfficeProduct({ state }, payload) {
      state.form.productList = await service.getProductsByOfficeName(payload);
    },
    async submit({ state }) {
      await service.addSwiper(state.form.item);
    },
    async remove({ state }, payload) {
      await service.removeSwiper(payload);
    },
    async initDetail({ state }, payload) {
      const detail = await service.getSwiperDetail(payload);
      state.detail = detail;
    },
    async setStatus({ state }, payload) {
      await service.setSwiperStatus(state.detail.bannerId, payload);
      state.detail['status'] = payload;
    }
  }
});

export default store;
