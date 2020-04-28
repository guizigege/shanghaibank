import { Vue, Component } from 'vue-property-decorator';
import { AppUrls, IconScan } from '@/utils/consts.ts';
import SearchBar from '@/components/search-bar/search-bar';
import Location from '@/components/location/location';
import SweiperImages from '@/components/sweiper-images/sweiper-images';
import SuperiorList from './superior-list/superior-list';
import PromotionList from './promotion-list/promotion-list';

import service from '@/api/service/client';
import store from './store';
import { ProductType } from '@/models/enums';
import { handleError } from '@/utils';

const debug = require('@/utils/debug')('log:Home/Index');

@Component({
  components: {
    SearchBar,
    SweiperImages,
    SuperiorList,
    PromotionList,
    Location
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  iconScan = IconScan;

  placeholder = '找优品 搜活动';

  current = 'superior';

  onLoad() {
    //
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading',
    })
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
    wx.hideToast();
  }

  onTabChange(e) {
    this.current = e.mp.detail.key;

    this.getData({
      type: this.currentProductType
    });
  }

  onScanCode() {
    // wx.navigateTo({
    //   url: `${AppUrls.CLIENT_COMMON_GIFTS}?productId=51`
    // });
    wx.scanCode({
      success: res => {
        if (
          res['errMsg'] === 'scanCode:ok' &&
          res['result'].indexOf('?productId=') === 0
        ) {
          wx.navigateTo({
            url: `${AppUrls.CLIENT_COMMON_GIFTS}${res['result']}`
          });
        }
      }
    });
  }

  onSearchChanged(e) {
    this.getData({
      type: this.currentProductType,
      searchStr: e
    });
  }

  onLocationChanged(e) {
    this.getData({
      la: e.location.lat,
      lo: e.location.lng,
      type: this.currentProductType
    });
  }

  onLoadCurrentLocation(e) {
    const params = {
      name: e.address,
      address: e.address,
      latitude: e.location.lat,
      longitude: e.location.lng
    };
    service.saveCurrentLocation(params);

    this.getData({
      la: e.location.lat,
      lo: e.location.lng,
      type: this.currentProductType
    });
  }

  private getData(params: {
    type: ProductType;
    la?: number;
    lo?: number;
    searchStr?: string;
  }) {
    store.dispatch('getData', params).catch(handleError);
  }

  private get currentProductType() {
    return this.current === 'superior' ? ProductType.优品 : ProductType.活动;
  }
}

export default Index;
