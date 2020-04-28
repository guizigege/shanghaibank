import QQMapWX from 'static/qqmap/qqmap-wx-jssdk';
import auth from '@/api/auth';
import storage from '@/utils/storage';
import { defaultDistance } from '@/utils/consts';

const QQMapKey = {
  client: 'QNQBZ-TSARI-AV7GZ-5EEDI-JE2DF-5OFCC',
  admin: 'TBUBZ-F6RCQ-HN55Z-GACDK-GSM4V-2DFMB'
};

const geocoderSig = '0US1aVw8lnHQWBPoP6khF5eFN9LN9Wd';

/**
 * QQ地图API共用类
 */
class QQMap {
  mapSdk: QQMapWX;

  constructor() {
    this.mapSdk = new QQMapWX({ key: this.key });
  }

  private get key() {
    return auth.isAdminApp ? QQMapKey.admin : QQMapKey.client;
  }

  /**
   * 地点搜索，搜索周边poi，比如：“酒店” “餐饮” “娱乐” “学校” 等等
   * @param keyword 关键字
   * @param location
   */
  search(keyword: string, location: object) {
    return new Promise((resolve, reject) => {
      this.mapSdk.search({
        keyword,
        location,
        page_size: 20,
        success(res: any) {
          resolve(res);
        },
        fail(res: any) {
          reject(res);
        }
      });
    });
  }

  /**
   * 用于获取输入关键字的补完与提示，帮助用户快速输入
   * @param keyword 关键字
   * @see https://lbs.qq.com/qqmap_wx_jssdk/method-getsuggestion.html
   */
  getSuggestion(keyword: string, region?: string) {
    return new Promise((resolve, reject) => {
      this.mapSdk.getSuggestion({
        keyword,
        region,
        success(res: any) {
          resolve(res);
        },
        fail(res: any) {
          reject(res);
        }
      });
    });
  }

  /**
   * 本接口提供由坐标到坐标所在位置的文字描述的转换，输入坐标返回地理位置信息和附近poi列表。
   * @param latitude 经度
   * @param longitude 纬度
   * @see https://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html
   */
  reverseGeocoder(latitude: number, longitude: number) {
    return new Promise((resolve, reject) => {
      this.mapSdk.reverseGeocoder({
        location: {
          latitude,
          longitude,
          sig: geocoderSig
        },
        sig: geocoderSig,
        success(res) {
          resolve(res);
        },
        fail(res) {
          reject(res);
        }
      });
    });
  }

  /**
   * 腾讯地图Direction API，提供多种交通方式的路线计算能力，本例为步行（walking）路线规划
   * @param from 起点位置，格式：lat,lng
   * @param to 终点位置，格式：lat,lng
   * @see https://lbs.qq.com/webservice_v1/guide-road.html
   */
  direction(from: string, to: string) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://apis.map.qq.com/ws/direction/v1/walking',
        data: {
          from,
          to,
          key: this.key
        },
        method: 'GET',
        dataType: 'json',
        success(res) {
          resolve(res);
        },
        fail(res) {
          reject(res);
        }
      });
    });
  }

  /**
   * 距离计算接口
   * @param from 若起点有数据则采用起点坐标，若为空默认当前地址
   * @param to 终点坐标
   * @see https://lbs.qq.com/qqmap_wx_jssdk/method-calculatedistance.html
   */
  calculateDistance(
    from: string = '',
    to: [{ latitude: string; longitude: string }]
  ): Promise<string> {
    const { latitude, longitude } = to[0];
    const storageDistance = this.getDistanceFromStorage(latitude, longitude);

    if (storageDistance) {
      return new Promise((resolve) => resolve(storageDistance));
    }

    return new Promise((resolve, reject) => {
      this.mapSdk.calculateDistance({
        from,
        to,
        success: (res) => {
          // 转换为保留 2 位小数的以 km 单位的距离
          const distance = (+res.result['elements'][0].distance / 1000).toFixed(2);
          this.setDistanceToStorage(latitude, longitude, distance);
          resolve(+distance > 0 ? distance : defaultDistance);
        },
        fail(res) {
          reject(res);
        }
      });
    });
  }

  getDistanceFromStorage(latitude, longitude) {
    const distance = storage.get('distance');
    const key = this.getDistanceKey(latitude, longitude);
    return distance && distance[key] ? distance[key] : 0;
  }

  setDistanceToStorage(latitude, longitude, value) {
    const distance = storage.get('distance') || {};
    const key = this.getDistanceKey(latitude, longitude);
    distance[this.getDistanceKey(latitude, longitude)] = value;
    storage.set('distance', distance);
  }

  getDistanceKey(latitude, longitude) {
    return `${latitude}_${longitude}`;
  }

  // 获取城市列表
  getCityLists() {
    return new Promise((resolve, reject) => {
      this.mapSdk.getCityList({
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  }

  /**
   * 获取一组 marker 的位置信息
   * @param item 当前 marker 位置
   * @param index 所在数组索引
   * @param arr marker 数组
   */
  getMarkerLocation(item, index, arr = []) {
    const obj = JSON.parse(item.location);
    const i = arr.findIndex(
      x => x['latitude'] === obj.latitude && x['longitude'] === obj.longitude
    );
    const isExist = i !== index;

    return {
      latitude: isExist ? this.getOffset(obj.latitude) : obj.latitude,
      longitude: isExist ? this.getOffset(obj.longitude) : obj.longitude,
      address: obj.address
    };
  }

  /**
   * 相同经纬度的 marker 做偏移处理以免在显示为同一点
   * @param item 经度，纬度
   */
  private getOffset(item) {
    return item + (Math.random() - 1.5) / 1500; // * (Math.random() * (max - min) + min);
  }
}

export default new QQMap();
