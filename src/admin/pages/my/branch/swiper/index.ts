import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { SwiperType } from '@/models/enums';
import { getImageUrl } from '@/utils';
import store from './store';

const debug = require('@/utils/debug')('log:Admin/My/Branch');

@Component({
  components: {
    //
  }
})
class Swiper extends Vue {
  AppUrls = AppUrls;

  bannerUrls: Array<string> = [];

  get list() {
    return store.state.list;
  }

  onLoad(query) {
    if (query && query.type) {
      store.commit('initType', +query.type);
    }
  }

  onShow() {
    store.commit('clearList');
    this.init().catch(this.handlerError);
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  async onClickItem(item) {
    await store.dispatch('initDetail', item.bannerId);

    wx.navigateTo({
      url: AppUrls.ADMIN_MY_BRANCH_SWIPER_DETAIL
    });
  }

  async onAdd() {
    await store.dispatch('initAddForm');

    wx.navigateTo({
      url: AppUrls.ADMIN_MY_BRANCH_SWIPER_FORM
    });
  }

  async onRemove(bannerId) {
    store.dispatch('remove', bannerId).catch(this.handlerError);

    this.init().catch(this.handlerError);
  }

  private async init() {
    await store.dispatch('initList');

    this.listChanged();
    wx.setNavigationBarTitle({
      title: store.state.type === SwiperType.Home ? '首页轮播' : '附近轮播'
    });
  }

  private listChanged() {
    if (this.list && this.list.length > 0) {
      this.bannerUrls = this.list.map(item =>
        getImageUrl(`${item['imageUrl']}`)
      );
    }
  }

  private handlerError(err) {
    console.error(err);
  }
}

export default Swiper;
