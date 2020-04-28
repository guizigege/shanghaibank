import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class WxRouterMixin extends Vue {
  navigateTo(url, success?, fail?) {
    wx.navigateTo({
      url,
      success,
      fail
    });
  }
}
