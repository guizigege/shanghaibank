import { Vue, Component } from 'vue-property-decorator';
import admin from '@/api/service/admin';
import { getImageUrl, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import CardFansInfo from '@/components/card-fans-info/card-fans-info';
import { AppType } from '@/models/enums';

@Component({
  components: {
    Empty,
    CardFansInfo
  }
})
class FocusList extends Vue {
  list: any = {};
  isLoad: boolean = false;
  amount: number = 0;
  subAmount: number = 0;
  appType = AppType;
  needFocus: boolean = false;
  userId: string = '';

  async onLoad(options) {
    wx.setNavigationBarTitle({ title: `TA的关注` });
    if (options.userId) {
      this.userId = options.userId;
      await this.init({ userId: options.userId });
    }
  }

  async init(param) {
    const data = await admin.attentionList(param);
    const ar = data.rows
      .filter(c => this.appType.Client === c.appId)
      .map(c => {
        c.realIcon = getImageUrl(c.icon);
        c.releaseTime = timeAgo(c.createTime);
        return c;
      });
    this.list = [...this.list, ...ar];
    this.isLoad = true;
    this.amount = data.amount;
    this.subAmount = data.subAmount;
  }

  onUnload() {
    this.isLoad = false;
    this.amount = 0;
    this.list = [];
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.list[this.list.length - 1];
      await this.init({ userId: this.userId, createTime: last.createTime });
    }
  }
}

export default FocusList;
