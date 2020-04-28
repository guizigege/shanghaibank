import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  AppUrls,
  IconLocation,
  IconBluePoint,
  IconPinkPoint,
  defaultLocation
} from '@/utils/consts.ts';
import QQMap from '@/utils/qqmap';
import { isValidJSON, handleError } from '@/utils';
import auth from '@/api/auth';
import SelectBank from '@/components/select/select';
import service from '@/api/service/admin';
import storage from '@/utils/storage';

const debug = require('@/utils/debug')('log:Admin/Home');

@Component({
  components: {
    SelectBank
  }
})
class Index extends Vue {

  AppUrls = AppUrls;
  scale = 14;
  location = {};
  markers: any[] = [];
  circles: any[] = [];
  resultList: any[] = [];
  iconBluePoint = IconBluePoint;
  iconPinkPoint = IconPinkPoint;
  bankList = [];
  showMap = true;
  office = '';
  existCustomerCount = 0;
  potentialCustomerCount = 0;

  get isBranch() {
    return auth.isBranch;
  }

  get isOffice() {
    return auth.isOffice;
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

  onLoad() {
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading'
    });
  }

  onReady() {
    wx.hideToast();
  }

  async onShow() {
    // 小程序 hook
    debug('onShow');

    if (this.isBranch === false) {
      // 分行在网点下拉列表初始化后会触发相应事件，无须重复调用接口
      this.fetchLocation();
    }

    if (auth.isBranch) {
      this.bankList = await service.bankListWithLocation();

      if (this.bankList.length > 0) {
        this.office = this.bankList[0]['office'];
      }
    }
  }

  /** 点击红包获客 */
  onClickRedPacket() {
    wx.navigateTo({
      url: AppUrls.ADMIN_HOME_RED_PACKETS
    });
  }

  /** 定点marker（蓝色点）触发 */
  markerTap(e) {
    const markerId = e.mp.markerId;
    const marker = this.markers.find(item => item.id === markerId);
    debug(marker);
    this.location = { latitude: marker.latitude, longitude: marker.longitude };
  }

  onShowSelect(e) {
    this.showMap = !e;
  }

  onChooseBank(e) {
    this.showMap = true;
    this.office = e.office;
    this.fetchLocation(e);
  }

  /** 初始化位置信息，包括当前经纬度及城市 */
  private fetchLocation(e?) {
    if (this.isBranch && e) {
      this.location = {
        latitude: e['latitude'],
        longitude: e['longitude']
      };
    } else {
      const loginInfo = storage.get('loginInfo');
      this.location = isValidJSON(loginInfo.location)
        ? JSON.parse(loginInfo.location)
        : {
          latitude: defaultLocation.la,
          longitude: defaultLocation.lo
        };
    }
  }

  private async search() {
    const params = {
      ...defaultLocation,
      la: this.location['latitude'],
      lo: this.location['longitude'],
      office: this.office
    };
    const res = await service.getCustomerStatistics(params);
    // 设置 已有客户、潜在客户 marker
    const list = [].concat(res);
    const marker = list.map(this.getCustomerMarker);
    this.markers = this.markers.concat(marker);
    this.existCustomerCount = list.filter(x => x['flag']).length;
    this.potentialCustomerCount = list.length - this.existCustomerCount;
  }

  private getCustomerMarker(item, index, arr) {
    const { latitude, longitude, address } = QQMap.getMarkerLocation(
      item,
      index,
      arr
    );
    return {
      id: item.userId,
      latitude,
      longitude,
      title: item.userName,
      address,
      distance: 0,
      iconPath: item.flag ? IconPinkPoint : IconBluePoint,
      width: 10,
      height: 10
    };
  }
}

export default Index;
