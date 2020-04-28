import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls, IconLocation, IconBluePoint } from '@/utils/consts.ts';
import QQMap from '@/utils/qqmap';
import { handleError, debounce } from '@/utils';
import service from '@/api/service/client';
const debug = require('@/utils/debug')('log:Admin/Home');

@Component({
  components: {
    //
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  area: number = 0;
  POI: string = '';
  scale: number = 14;
  keyword: string = this.POI;
  city: string = '';
  location: any = {};
  markers: any[] = [
    {
      id: 0,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      title: '红包发此处',
      iconPath: IconLocation,
      width: '20px',
      height: '20px',
      label: {
        content: '红包发此处',
        color: '#ffffff',
        bgColor: '#ff0000',
        anchorX: this.location.longitude,
        anchorY: this.location.latitude,
        borderRadius: '5px',
        padding: '10px',
        textAlign: 'center'
      }
    } // 红包发于此的标志
  ];
  circles: any[] = [
    {
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      color: '#999999aa',
      fillColor: '#7cb5ec22',
      strokeWidth: 1,
      radius: this.area
    }
  ];
  resultList: any[] = [];
  showResultList: boolean = false;
  currentLocationInfo = {};
  areaOptions: any = [
    {
      id: 1,
      value: 1000
    },
    {
      id: 2,
      value: 2000
    },
    {
      id: 3,
      value: 3000
    }
  ];  // 选项列表
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
    await this.search();
    this.markers[0] = Object.assign(this.markers[0], val);
    this.circles[0] = Object.assign(this.circles[0], val);
  }
  @Watch('area')
  onAreaChanged(value) {
    this.circles[0].radius = parseInt(value, 10);
  }

  onLoad() {
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading'
    });
    this.fetchLocation();
  }
  mounted() {
    // vue hook
    wx.hideToast();
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

  // 确定按钮
  onOk() {
    if (this.area) {
      wx.redirectTo({
        url: `${this.AppUrls.ADMIN_HOME_RED_PACKETS}?range=${this.area}米`
      });
    } else {
      wx.showToast({
        title: '请设置范围',
        duration: 1500,
        icon: 'loading'
      });
    }
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
    // 重置markers列表 防止地点和范围改变时导致数组累加
    this.markers.length = 1;
    const params = {
      la: this.location['latitude'],
      lo: this.location['longitude'],
      range: Number(this.area),
    };
    // 获取银行列表
    const res = await service.vicinityBankList(params);
    // 地图显示银行列表里各银行的标志
    const marker = res.map(this.getCustomerMarker);
    this.markers = this.markers.concat(marker);
  }

  // 地图网点标志
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
      width: 15,
      height: 15
    };
  }
  handleSelectArea(e) {
    this.area = Number(e.mp.detail.value);
    this.search().catch(err => console.log(err));
  }


}
export default Index;
