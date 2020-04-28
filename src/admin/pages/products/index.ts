import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import SuperiorList from './superior/list/superior-list';
import PromotionList from './promotion/list/promotion-list';
import store from './store';
import { ProductType } from '@/models/enums';
import auth from '@/api/auth';
import SelectBank from '@/components/select/select';
import SearchBar from '@/components/search-bar/search-bar';

const debug = require('@/utils/debug')('log:Admin/Products');

@Component({
  components: {
    SelectBank,
    SearchBar,
    SuperiorList,
    PromotionList
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  superior = 'superior';

  promotion = 'promotion';

  current = this.superior;

  selectedOffice = '';

  loaded = false;

  get search() {
    return store.state.search;
  }

  get isOffice() {
    return auth.isOffice;
  }

  get isBranch() {
    return auth.isBranch;
  }

  get officeList() {
    return store.state.officeList;
  }

  get productType() {
    return this.current === this.superior ? ProductType.优品 : ProductType.活动;
  }

  get currentSelectedOffice() {
    return store.state.selectedOffice;
  }

  async onShow() {
    // 小程序 hook
    debug('onShow');

    if (this.officeList.length === 0) {
      await store.dispatch('initOfficeList');
    }

    this.current =
      store.state.productType === ProductType.优品
        ? this.superior
        : this.promotion;

    if (!this.isBranch) {
      // 支行默认以网点列表第一个网点为条件查询，在下拉组件初始化触发,
      // 非支行时需要在此调用
      await this.fetchList(this.search);
    }

    this.loaded = true;
  }

  onHide() {
    this.loaded = false;
  }

  onLoad() {
    // 小程序 hook
    debug('onLoad');
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading'
    })
  }

  mounted() {
    // vue hook
    debug('mounted');
    wx.hideToast();
  }

  onAdd() {
    const type = this.productType;
    const url =
      type === ProductType.优品
        ? AppUrls.ADMIN_PRODUCTS_SUPERIOR_FORM
        : AppUrls.ADMIN_PRODUCTS_PROMOTION_FORM;

    store.commit('initProduct', type);
    wx.navigateTo({
      url
    });
  }

  async onSearchChanged(search: string) {
    const params = search ? { title: ['like', `%${search}%`] } : '';
    store.commit('setSearch', params);
    await this.fetchList(params);
  }

  async onOfficeChanged(params: { office: string, index: number }) {
    console.log('onOfficeChanged :', params);
    this.selectedOffice = params.office;
    store.commit('setSelectedOffice', params.index);
    store.commit('setSearch', { office: params.office });
    await this.fetchList(this.search);
  }

  async onTabChange(e) {
    this.current = e.mp.detail.key;
    store.commit('setProductType', this.productType);
    store.commit('resetList');

    const params = this.isBranch
      ? { office: this.selectedOffice }
      : this.search;
    store.commit('setSearch', params);
    await this.fetchList(params);
  }

  private fetchList(complex: any) {
    return store.dispatch('initList', {
      productType: this.productType,
      complex
    });
  }
}

export default Index;
