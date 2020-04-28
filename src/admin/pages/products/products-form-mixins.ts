import Vue from 'vue';
import Component from 'vue-class-component';
import { AppUrls } from '@/utils/consts';
import { ProductType } from '@/models/enums';
import store from './store';
import { handleError } from '@/utils';
import { $Toast } from 'static/iview/base';
import EnumValues from '@/utils/enum-values';

@Component
export default class ProductsFormMixin extends Vue {
  AppUrls = AppUrls;

  loaded = false;

  get product() {
    return store.state.form.product;
  }

  get invalid() {
    return store.state.form.anyError;
  }

  onShow() {
    // 小程序 hook
    this.loaded = true;
    const type = EnumValues.getNameFromValue(
      ProductType,
      store.state.productType
    );
    const operate = store.state.form.product.productId ? '编辑' : '新增';
    const title = `${operate}${type}`;
    wx.setNavigationBarTitle({ title });
  }

  onHide() {
    //
  }

  onLoad() {
    this.loaded = true;
  }

  onUnload() {
    //
  }

  async mounted() {
    // vue hook
  }

  /** 提交 */
  onSubmit() {
    this.handleSave('submit').catch(handleError);
  }

  /** 保存草稿 */
  onSave() {
    this.handleSave('save').catch(handleError);
  }

  onPreview() {
    if (!this.invalid) {
      store
        .dispatch('initDetail')
        .then(() => {
          const url =
            store.state.productType === ProductType.优品
              ? AppUrls.ADMIN_PRODUCTS_SUPERIOR_DETAIL
              : AppUrls.ADMIN_PRODUCTS_PROMOTION_DETAIL;

          wx.navigateTo({
            url
          });
        })
        .catch(err => console.log(err));
    } else {
      $Toast({
        content: '请完善信息'
      });
    }
  }

  onAfterUploaded(fileId, target) {
    store.commit('updateImageUrl', { url: fileId, target });
  }

  async handleSave(type: 'save' | 'submit' = 'save') {
    if (!this.invalid) {
      const success = await store.dispatch(type);
      if (success) {
        wx.switchTab({
          url: AppUrls.ADMIN_PRODUCTS
        });
      }
    } else {
      $Toast({
        content: '请完善信息'
      });
    }
  }
}
