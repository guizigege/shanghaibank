import { Vue, Component } from 'vue-property-decorator';
import {
  IconEndPoint,
  IconStartPoint,
  defaultLocation,
  defaultDistance
} from '@/utils/consts';
import { isValidJSON, equals } from '@/utils';
import QQMap from '@/utils/qqmap';
import { $Toast } from '@/../static/iview/base/index';

const debug = require('@/utils/debug')('log:Common/Navigate');

@Component({
  components: {
    //
  }
})
class Index extends Vue {
  scale: number = 15;
  myLocation = {};
  destination = { latitude: defaultLocation.la, longitude: defaultLocation.lo };
  centerLocation = {};
  markers: any[] = [];
  polyline: any[] = [];
  distance = defaultDistance;

  bankLocation = {
    latitude: 0,
    longitude: 0,
    name: '上海银行科技园支行',
    address: '广东省深圳市南山区深南大道9789西门'
  };

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '路线导航' });
    if (options && isValidJSON(options.location)) {
      this.bankLocation = { ...this.bankLocation, ...JSON.parse(options.location) };
      this.destination = {
        latitude: this.bankLocation.latitude,
        longitude: this.bankLocation.longitude
      };
      if (this.bankLocation.latitude === 0 && this.bankLocation.longitude === 0) {
        $Toast({
          content: '网点未设置位置信息，无法导航',
          type: 'warning'
        });
        return;
      }
      this.fetchLocation();
    }
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  /** 初始化位置信息，包括当前经纬度及城市 */
  fetchLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: ({ latitude, longitude }) => {
        this.myLocation = { latitude, longitude };
        console.log("初始化",this.myLocation);
        const destination = this.destination;
        // 设置中心坐标点，使用户更直观看到导航线路图
        this.centerLocation = {
          latitude: (latitude + destination.latitude) / 2,
          longitude: (longitude + destination.longitude) / 2
        };

        const pointStyle = {
          width: 30,
          height: 30
        };
        const startPoint = Object.assign(
          { iconPath: IconStartPoint },
          pointStyle,
          this.myLocation
        );
        const endPoint = Object.assign(
          { iconPath: IconEndPoint },
          pointStyle,
          destination
        );

        if (equals(this.myLocation, destination)) {
          startPoint['latitude'] += 0.0008;
          startPoint['longitude'] += 0.0008;
          this.markers = [startPoint, endPoint];
        } else {
          this.markers = [startPoint, endPoint];
          this.navigate(
            this.concatLocation(this.myLocation),
            this.concatLocation(destination)
          );
        }
      }
    });
  }

  /** 将经纬度拼接 */
  concatLocation(location: any) {
    return [location.latitude, location.longitude].join(',');
  }

  /** 导航线 */
  navigate(from: string, to: string) {
    QQMap.direction(from, to)
      .then((res: any) => {
        if (!res.data.result && res.data.message) {
          $Toast({
            content: res.data.message,
            type: 'warning'
          });
          return;
        }

        const route = res.data.result.routes[0];
        const coors = route.polyline;

        const points: any[] = [];
        const kr = 1000000;
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        // 将解压后的坐标放入点串数组points中
        for (let i = 0; i < coors.length; i += 2) {
          points.push({ latitude: coors[i], longitude: coors[i + 1] });
        }

        this.distance = (route.distance / 1000).toFixed(2);

        this.polyline = [
          {
            points,
            color: '#009966DD',
            dottedLine: true,
            width: 4
          }
        ];
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default Index;
