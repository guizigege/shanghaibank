import Vue from 'vue';
import Vuex from 'vuex';
import service from '../../../api/service/admin';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    mediaInfo: {}
  },
  mutations: {
    getMediaInfo(state, payload) {
      state.mediaInfo = payload;
    }
  },
  actions: {

  }
});

export default store;
