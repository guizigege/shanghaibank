import Vue from 'vue';
import Vuex from 'vuex';
import { Announcement } from '@/models/announcement';
import service from '@/api/service/admin';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    list: [] as any,
    amount: 0,
    subAmount: 0
  },
  mutations: {
    clearList(state) {
      state.list = [];
    },

    clean(state) {
      state.list = [];
      state.amount = 0;
      state.subAmount = 0;
    },

    updateData(state, payload) {
      state.list = state.list.concat(payload.rows);
      state.amount = payload.amount;
      state.subAmount = payload.subAmount;
    },

    delList(state, payload) {
      state.list = state.list.filter(c => c.noticeId !== payload.noticeId);
    }
  },
  actions: {
    // 公告列表
    async getList({ state, commit }, payload) {
      const ret = await service.getAnnouncementList(payload);
      commit('updateData', ret);
    },
    // 增加公告
    async addAnnouncement({ commit }, req: Announcement) {
      await service.addAnnouncement(req);
    },
    // 删除公告
    async delAnnouncement({ commit }, payload) {
      await service.delAnnouncement(payload);
      commit('delList', payload);
    },
    // 编辑公告
    async editAnnouncement({ commit }, payload) {
      await service.editAnnouncement(payload);
    }
  }
});

export default store;
