import { Vue, Component } from 'vue-property-decorator';
import GroupBuyList from '@/components/detail-product/group-buy-list/group-buy-list';
import GroupBuyModal from '@/components/detail-product/group-buy-modal/group-buy-modal';
import service from '@/api/service/client';
import { formatTime, getImageUrl } from '@/utils';
import Empty from '@/components/empty/empty';
import { GroupListItem } from '@/models/product';

@Component({
  components: {
    GroupBuyList,
    GroupBuyModal,
    Empty
  }
})
class GroupBuyDetail extends Vue {
  productId: string = '';
  detail: any = {};
  list: Array<GroupListItem> = new Array<GroupListItem>();
  isLoad: boolean = false;
  subAmount: number = 0;
  toOrder: boolean = false;
  buyType: number = 0;
  buyGroupId: number = 0;
  buyGroupIndex: number = 0;

  async onLoad(options) {
    wx.setNavigationBarTitle({ title: `拼团` });
    if (options.productId) {
      this.productId = options.productId;
      this.getList();
    }
  }

  openBuyModal(e) {
    this.toOrder = !!e[0];
    this.buyType = e[0];
    this.buyGroupId = e[1];
    this.buyGroupIndex = e[2];
  }

  closeToOrder() {
    this.toOrder = false;
  }

  joinSuccess(res) {
    let tmp = this.list[this.buyGroupIndex];
    tmp.total = res.total;
    tmp.status = res.status;
    this.$set(this.list, this.buyGroupIndex, tmp);
  }

  getList(data?) {
    const req = { productId: this.productId, length: 20 };
    if (data) {
      Object.assign(req, data);
    }
    service.getGroupList(req).then(res => {
      this.list = [...this.list, ...res.rows].map(c => {
        // 头像链接
        c.realIcon = getImageUrl(c.icon);
        // 参与了此拼团，是团长
        if (c.groupId === res.groupId && res.isGroupLeader === 1) {
          c.isCaptain = true;
        }
        // 参与了此拼团，不是团长
        if (c.groupId === res.groupId && res.isGroupLeader === 0) {
          c.isJoin = true;
        }
        // 截至时间
        c.time = formatTime(c.createTime + res.groupTime);
        return c;
      });
      this.detail = res;
      this.subAmount = res.subAmount;
      wx.setNavigationBarTitle({ title: `${res.amount}人拼团` });
      this.isLoad = true;
    });
  }

  onReachBottom() {
    if (this.subAmount > 0) {
      const last = this.detail.rows[this.detail.rows.length - 1];
      this.getList({ groupId: last.groupId });
    }
  }

  onUnload() {
    this.list.forEach(c => {
      clearInterval(c.timeBack);
    });
    this.list = [];
  }
}

export default GroupBuyDetail;
