import { Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { formatTime, getImageUrl } from '@/utils';
import { strSeparator } from '@/utils/consts';
import OrderSuperiorInfo from '@/components/order-superior-info/order-superior-info';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';

@Component({
  components: {
    OrderSuperiorInfo,
    Empty
  }
})
class Index extends mixins(CalcDistanceMixin) {
  AppUrls = AppUrls;
  current = 1;
  length: number = 20;
  btnList = ['拼团中', '待去网点', '全部'];
  activeClass = 0;
  list: any = [];
  isEnd: boolean = false;

  get loading() {
    return store.state.loading;
  }

  async onShow() {
    store.commit('clearList');
    storage.remove('orderDetail');
    const s = storage.get('orderListStatus');
    if (s) {
      this.current = s.current;
      this.activeClass = s.activeClass;
    }
    await this.getList(0, 'new');
  }

  async getList(data?, method?) {
    const req = { length: this.length, productType: Number(this.current), labelType: this.activeClass + 1 };
    if (data) {
      Object.assign(req, data);
    }
    await store.dispatch('getOrderList', req);
    if (method === 'new') {
      this.list = [];
    }
    const list = store.state.list.map(c => {
      c.realImageUrl = getImageUrl(c.imageUrl);
      // 订单在拼团中
      if (c.status === 1) {
        // 拼团间隔时间转换毫秒
        if (c.groupTime) {
          c.groupTime = 3600 * c.groupTime * 1000;
        }
        // 拼团截止时间
        // const d = timeDuration(c.groupTime + c.groupCreateTime);
        c.groupEndTimeStr = formatTime(c.groupTime + c.groupCreateTime);
        // 拼团发起时间
        c.groupCreateTimeStr = formatTime(c.groupCreateTime);
      }
      // 下单时间
      c.createTimeStr = formatTime(c.createTime);
      // 活动、优品开始结束时间
      c.endTimeStr = formatTime(c.endTime);
      c.beginTimeStr = formatTime(c.beginTime);
      // 预约或者拼团
      c.isGroup = c.hasOwnProperty('groupId');
      // 距离
      this.calcDistance(c.location).then(res => {
        c.dist = res;
      });
      // 银行信息
      try {
        if (typeof c.bankInfo === 'string') {
          c.bankInfo = JSON.parse(c.bankInfo);
        }
      } catch (e) {
        console.log('bankInfo is empty');
      }
      // 礼物信息
      try {
        if (typeof c.giftInfo === 'string') {
          c.giftInfo = JSON.parse(c.giftInfo).map(c => {
            c.realImageUrls = c.imageUrl.split(strSeparator).map(item => getImageUrl(`${item}`));
            return c;
          });
        }
      } catch (e) {
        console.log('giftInfo is empty');
      }
      return c;
    });

    this.list = list;
    this.isEnd = store.state.isEnd;
  }

  async onSelectStatus(index) {
    if (index === this.activeClass) {
      return;
    }
    this.activeClass = index;
    store.commit('clearList');
    await this.getList(0, 'new');
  }

  jumpDetail(e) {
    storage.set('orderDetail', e);
    storage.set('orderListStatus', { activeClass: this.activeClass, current: this.current });
    wx.navigateTo({
      url: AppUrls.CLIENT_ORDER_DETAIL_SUPERIOR
    });
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '订单' });
  }

  onHide() {
    // this.list = [];
    this.isEnd = false;
    this.activeClass = 0;
    this.current = 1;
  }

  async lower() {
    if (!this.isEnd) {
      const last: any = this.list[this.list.length - 1];
      await this.getList({ createTime: last.createTime });
    }
  }

  async onTabsChange(e) {
    if (e.mp.detail.key === this.current) {
      return;
    }
    this.current = e.mp.detail.key;
    store.commit('clearList');
    await this.getList(0, 'new');
  }

  // 切换二级tab会导致数据不正确，如“全部”的数据会出现在“拼团中”
  // private initList(tmpList, tmp) {
  //   return unionWith(tmpList, tmp, this.union).sort(this.sortBy);
  // }
  //
  // private union(a, b) {
  //   return a.userId === b.userId && a.orderID === b.orderID;
  // }
  //
  // private sortBy(a, b) {
  //   return (+b.orderID) - (+a.orderID);
  // }
}

export default Index;
