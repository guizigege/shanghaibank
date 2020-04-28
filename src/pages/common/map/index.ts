import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls, IconLocation, IconBluePoint } from '@/utils/consts.ts';
import QQMap from '@/utils/qqmap';
import { handleError, debounce, navigateBackWithData } from '@/utils';
import service from '@/api/service/client';

const debug = require('@/utils/debug')('log:Admin/Home');

@Component({
  components: {
    //
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  POI: string = '';
  scale: number = 14;
  keyword: string = this.POI;
  city: string = '';
  location = {};
  markers: any[] = [];
  circles: any[] = [];
  resultList: any[] = [];
  showResultList: boolean = false;
  currentLocationInfo = {};

  onInput = debounce(e => {
    this.keyword = e.mp.detail.value;
    if (this.keyword.length > 0) {
      this.onKeywordChanged(this.keyword, '');
    }
  });

  @Watch('keyword')
  onKeywordChanged(val: string, oldVal: string) {
    this.showResultList = true;
    QQMap.getSuggestion(val, this.city)
      .then((res: any) => {
        const { data, count } = res;
        this.resultList = data || [];
        if (this.resultList.length) {
          const { lat, lng } = this.resultList[0].location;
          this.location = { latitude: lat, longitude: lng };
        }
      })
      .catch(handleError);
  }

  @Watch('location')
  async onLocationChanged(val) {
    const marker = Object.assign(
      { iconPath: IconLocation, width: 20, height: 20 },
      val
    );
    this.markers = [marker];
    await this.search();

    // 画3公里范围的圆
    this.circles = [
      {
        latitude: val.latitude,
        longitude: val.longitude,
        color: '#999999aa',
        fillColor: '#7cb5ec22',
        strokeWidth: 1,
        radius: 3000
      }
    ];
  }

  @Watch('resultList')
  onResultListChanged() {
    const list = this.resultList.map(item => ({
      latitude: item.location.lat,
      longitude: item.location.lng
    }));

    this.markers = list;
  }

  onShow() {
    // 小程序 hook
    debug('onShow');

    this.fetchLocation();
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  /** 点击搜索时，默认将resultList[0] 当成定位地址进行搜索 */
  onSearch() {
    const addr = this.resultList[0];
    this.onSelectedSearchItem(addr);
  }

  /** 点击结果列表条目触发 */
  onSelectedSearchItem(addr) {
    this.showResultList = false;

    const { lat, lng } = addr.location;
    this.location = { latitude: lat, longitude: lng };
    this.currentLocationInfo = addr;
    this.POI = addr.title;
  }

  onOk() {
    navigateBackWithData(this.currentLocationInfo);
  }

  /** 定点marker（蓝色点）触发 */
  markertap(e) {
    const markerId = e.mp.markerId;
    const marker = this.markers.find(item => item.id === markerId);
    debug(marker);
    this.location = { latitude: marker.latitude, longitude: marker.longitude };
  }

  /** 初始化位置信息，包括当前经纬度及城市 */
  private fetchLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: ({ latitude, longitude }) => {
        // 获取当前城市名称
        QQMap.reverseGeocoder(latitude, longitude)
          .then((res: any) => {
            this.city = res.result.ad_info.city;
            this.location = { latitude, longitude };
            this.currentLocationInfo = res.result.ad_info;
          })
          .catch(err => console.log(err));
      }
    });
  }

  private async search() {
    const params = {
      la: this.location['latitude'],
      lo: this.location['longitude'],
      range: 3000,
    };
    const res = await service.vicinityBankList(params);
    // 设置 marker
    const list = [].concat(res);
    const marker = list.map(this.getCustomerMarker);
    this.markers = this.markers.concat(marker);
  }

  private getCustomerMarker(item, index, arr) {
    const { latitude, longitude, address } = QQMap.getMarkerLocation(
      item,
      index,
      arr
    );
    return {
      id: item.office,
      latitude,
      longitude,
      title: item.office,
      address,
      distance: 0, // item._distance
      iconPath: IconBluePoint,
      width: 10,
      height: 10
    };
  }
}

export default Index;
