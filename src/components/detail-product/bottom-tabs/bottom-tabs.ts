import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ProductDetail, emptyProductDetail } from '@/models/product';
import { CollectState } from '@/models/enums';
import { handleError } from '@/utils';
import service from '@/api/service/client';
import { AppUrls } from '@/utils/consts';

@Component({
  components: {}
})
class BottomTabs extends Vue {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  AppUrls = AppUrls;

  visible = false;

  mounted() {
    // vue hook
  }

  // 评论
  onComment() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_COMMON_USER_COMMENT_DETAIL}?productId=${this.detail.product.productId}`
    });
  }

  async onCollect() {
    const prevState = this.detail.collectState;
    this.detail.collectState =
      this.detail.collectState === CollectState.Cancel
        ? CollectState.Collect
        : CollectState.Cancel;

    try {
      await service.updateCollectState(
        this.detail.product.productId,
        this.detail.collectState
      );
    } catch (error) {
      this.detail.collectState = prevState;
      handleError('收藏失败');
    }
  }

  // 单独预约
  @Emit('toOrder')
  async onAppointment() {
    return 1;
    // try {
    //   await service.order(this.detail.product.productId);
    //   this.detail.orderState = 1;
    //   $Toast({
    //     content: '预约成功',
    //     type: 'success'
    //   });
    // } catch (err) {
    //   handleError(err || '预约失败，请稍后再试');
    // }
  }

  // 发起拼团
  @Emit('toOrder')
  async onStartGroupe() {
    return 3;
    // try {
    //   await service.startGroup(this.detail.product.productId);
    //   $Toast({
    //     content: '成功发起拼团',
    //     type: 'success'
    //   });
    //   this.detail.groupState = 1;
    // } catch (err) {
    //   handleError(err || '拼团失败，请稍后再试');
    // }
  }
}

export default BottomTabs;
