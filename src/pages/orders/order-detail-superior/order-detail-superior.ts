import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import OrderDetailBank from '@/components/order-detail-bank/order-detail-bank';
import OrderDetailActive from '@/components/order-detail-active/order-detail-active';
import storage from '@/utils/storage';
import { emptyOrderItem, OrderItem } from '@/models/product';
import { GroupType, OrderStatus } from '@/models/enums';
import { formatTime } from '@/utils';
import { $Toast } from '../../../../static/iview/base';

@Component({
  components: {
    OrderDetailBank,
    OrderDetailActive
  }
})
class OrderDetailSuperior extends Vue {
  AppUrls = AppUrls;
  order: OrderItem = emptyOrderItem;
  orderStatus = OrderStatus;
  groupType = GroupType;

  get groupCreateTimeStr() {
    return this.order && this.order.groupCreateTime
      ? formatTime(+this.order.groupCreateTime)
      : '';
  }

  onShow() {
    // 小程序 hook
    // debug('onShow');
  }

  onLoad() {
    this.order = storage.get('orderDetail');
    const title = this.order.isGroup ? '拼团订单' : '预约订单';
    wx.setNavigationBarTitle({ title });
  }

  onUnload() {
    this.order = emptyOrderItem;
  }

  onGoBank() {
    if (this.order.location) {
      wx.navigateTo({
        url: `${AppUrls.COMMON_NAVIGATE}?location=${this.order.location}`
      });
    } else {
      $Toast({
        content: '未获取到坐标',
        type: 'warning'
      });
    }
  }
}

export default OrderDetailSuperior;
