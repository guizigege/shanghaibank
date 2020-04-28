import Vue from 'vue';
import Component from 'vue-class-component';
import { AppUrls } from '@/utils/consts';
import { ProductType } from '@/models/enums';
import store from './store';

@Component
export default class ProductsDetailMixin extends Vue {
  AppUrls = AppUrls;

  isLoaded = false;

  get item() {
    return store.state.detail;
  }

  onLoad() {
    this.isLoaded = true;
  }

  onUnload() {
    // this.vm = this.resetVm();
    this.isLoaded = false;
    // this.$v.$reset();
  }

  async onGoBack() {
    wx.switchTab({
      url: AppUrls.ADMIN_PRODUCTS
    });
  }

  onEdit() {
    store.commit('initEditItem', this.item.product);

    const url =
      store.state.productType === ProductType.优品
        ? AppUrls.ADMIN_PRODUCTS_SUPERIOR_FORM
        : AppUrls.ADMIN_PRODUCTS_PROMOTION_FORM;
    const pages = getCurrentPages();
    const formIdx = pages.findIndex(x => url.indexOf(x['route']) > 0);

    console.log('url, pages, formIdx :', url, pages, formIdx);
    if (formIdx > 0) {
      const delta = pages.length - 1 - formIdx;
      wx.navigateBack({
        delta
      });
      return;
    }

    wx.navigateTo({
      url
    });
  }
}
