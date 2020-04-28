import { Vue, Component, Prop } from 'vue-property-decorator';
import { EmptyManage, Manager } from '@/models/manager';
import { getImageUrl } from '@/utils';

@Component
class RecommendedProducts extends Vue {
  @Prop() manager: Manager;
  isPlay = false;
  productPhoto = '';
  giftInfo: any = {};

  onLoad() {
    this.productPhoto = getImageUrl(this.manager.productInfo.imageUrl);
    this.giftInfo = JSON.parse(this.manager.productInfo.giftInfo);
  }

  onShow() {
    this.productPhoto = getImageUrl(this.manager.productInfo.imageUrl);
    this.giftInfo = JSON.parse(this.manager.productInfo.giftInfo);
  }

  onPlayEmbed() {
    this.isPlay = !this.isPlay;
  }

  onUnload() {
    this.manager = EmptyManage;
    this.isPlay = false;
    this.productPhoto = '';
    this.giftInfo = {};
  }
}

export default RecommendedProducts;
