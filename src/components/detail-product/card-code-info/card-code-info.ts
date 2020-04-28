import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { EmptyImagePlaceholder, AppUrls } from '@/utils/consts';
import { getImageUrl } from '@/utils';

@Component
class CardCodeInfo extends Vue {
  @Prop() qrId: string;

  url = EmptyImagePlaceholder;

  onLoad() {
    // watch 无效，使用 onLoad 与 onUnload 手动控制
    this.qrIdChanged();
  }

  onUnload() {
    this.url = EmptyImagePlaceholder;
  }

  mounted() {
    // vue hook
  }

  onClick() {
    wx.previewImage({
      current: this.url,
      urls: [this.url]
    });
  }

  private qrIdChanged() {
    this.url = getImageUrl(this.qrId);
  }
}

export default CardCodeInfo;
