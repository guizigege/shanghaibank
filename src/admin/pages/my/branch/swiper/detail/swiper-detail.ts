import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from '../store';
import { getImageUrl, formatTime, handleError } from '@/utils';
import { SwiperStatus, SwiperType } from '@/models/enums';

const debug = require('@/utils/debug')('log:Admin/My/Branch/Swiper/Detail');

@Component({
  components: {
    //
  }
})
class SwiperDetail extends Vue {
  AppUrls = AppUrls;

  bannerUrl = '';

  beginTime = '';

  endTime = '';

  switch = false;

  get item() {
    return store.state.detail;
  }

  onLoad(query) {
    debug('onLoad');

    this.init();
  }

  onUnload() {
    this.beginTime = '';
    this.endTime = '';
    this.bannerUrl = '';

    // 返回列表
    store.dispatch('initList').catch(handleError);
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  async onChangeStatus(e) {
    this.switch = e.mp.detail.value;
    await store.dispatch(
      'setStatus',
      this.switch ? SwiperStatus.Online : SwiperStatus.Offline
    );
  }

  private init() {
    wx.setNavigationBarTitle({
      title: store.state.type === SwiperType.Home ? '首页轮播' : '附近轮播'
    });

    if (this.item) {
      this.beginTime = this.item.beginTime
        ? formatTime(+this.item.beginTime)
        : '';
      this.endTime = this.endTime = this.item.endTime
        ? formatTime(+this.item.endTime)
        : '';

      this.bannerUrl = getImageUrl(`${this.item.imageUrl}`);
      this.switch = +this.item.status === SwiperStatus.Online;
    }
  }
}

export default SwiperDetail;
