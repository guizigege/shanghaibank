import { Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { formatTime, getImageUrl, handleError } from '@/utils';
import service from '@/api/service/admin';
import Empty from '@/components/empty/empty';
import { mixins } from 'vue-class-component';
import CalcDistanceMixin from '@/mixin/calcDistMixin';

@Component({
  components: {
    Empty
  }
})
class Index extends mixins(CalcDistanceMixin) {
  AppUrls = AppUrls;
  loading: boolean = true;
  current = '1';
  productId: string = '';
  list: any = [];
  subAmount: number = 0;
  OrderAdminStatus = {
    1: '拼团中',
    2: '拼团中',
    3: '待扫码',
    4: '已扫码',
    5: '已失效'
  };

  async onLoad(options) {
    if (options.title) {
      wx.setNavigationBarTitle({ title: options.title });
    }
    if (options.productId) {
      this.productId = options.productId;
    }
    await this.getOrderItem();
  }

  async getOrderItem(data?, method?) {
    const req = { length: 5, productId: this.productId };
    if (data) {
      Object.assign(req, data);
    }
    if (method === 'new') {
      this.subAmount = 0;
      this.list = [];
    }
    this.loading = true;
    const res = await service.getOrderItem(req);
    this.loading = false;
    const d = res.rows.map(c => {
      c.realIcon = getImageUrl(c.icon);
      c.releaseTime = formatTime(c.createTime);
      // 预约或者拼团
      c.isGroup = c.hasOwnProperty('groupId');
      // 距离
      this.calcDistance(c.location)
        .then(res => {
          c.dist = res;
        })
        .catch(handleError);
      if (c.status === 1) {
        // 拼团截止时间
        c.endTimeStr = formatTime(c.groupTime + c.groupCreateTime);
      }
      c.endTimeStr = formatTime(c.endTime);

      return c;
    });
    this.subAmount = res.subAmount;
    this.list = [...this.list, ...d];
  }

  async getCollectItem(data?, method?) {
    const req = { length: 5, productId: this.productId };
    if (data) {
      Object.assign(req, data);
    }
    if (method === 'new') {
      this.subAmount = 0;
      this.list = [];
    }
    this.loading = true;
    const res = await service.getCollentItem(req);
    this.loading = false;
    const d = res.rows.map(c => {
      c.realIcon = getImageUrl(c.icon);
      c.releaseTime = formatTime(c.createTime);
      return c;
    });
    this.subAmount = res.subAmount;
    this.list = [...this.list, ...d];
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.list[this.list.length - 1];
      if (this.current === '1') {
        await this.getOrderItem({ createTime: last.createTime });
      } else if (this.current === '2') {
        await this.getCollectItem({ createTime: last.createTime });
      }
    }
  }

  async onTabChange(e) {
    if (this.current === e.mp.detail.key) {
      return;
    }
    this.current = e.mp.detail.key;
    if (this.current === '1') {
      await this.getOrderItem(0, 'new');
    } else if (this.current === '2') {
      await this.getCollectItem(0, 'new');
    }
  }

  onUnload() {
    this.list = [];
    this.subAmount = 0;
    this.current = '1';
    this.productId = '';
  }
}

export default Index;
