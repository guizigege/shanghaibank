import { ProductAuditState } from '@/models/enums';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { EmptyImagePlaceholder, IconExport } from '@/utils/consts';
import { getImageUrl } from '@/utils';
import auth from '@/api/auth';

const debug = require('@/utils/debug')('log:Component/SuperiorImg');

@Component
class SuperiorImg extends Vue {
  @Prop() bannerId: string;

  @Prop() status: ProductAuditState;

  iconExport = IconExport;

  bannerUrl = EmptyImagePlaceholder;

  isPublished = false;

  canEdit = false;

  canUnShelve = false;

  get isClientApp() {
    return auth.isClientApp;
  }

  onLoad() {
    this.bannerIdChanged();
    this.statusChanged();
  }

  onUnload() {
    this.bannerUrl = EmptyImagePlaceholder;
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  onEdit() {
    wx.navigateBack({
      delta: 1
    });
  }

  onUnShelve() {
    this.$emit('unShelve');
  }

  // 分享
  onShare() {
    wx.showShareMenu();
  }

  bannerIdChanged() {
    this.bannerUrl = getImageUrl(this.bannerId);
  }

  statusChanged() {
    this.isPublished = this.status === ProductAuditState.已发布;
    this.canEdit =
      auth.isAdminApp &&
      (this.status === ProductAuditState.草稿 ||
        this.status === ProductAuditState.不通过);
    this.canUnShelve =
      auth.isAdminApp && this.status === ProductAuditState.已发布;
  }
}

export default SuperiorImg;
