import { Vue, Component, Prop } from 'vue-property-decorator';
import { getImageUrl } from '@/utils';
import { EmptyManage } from '@/models/manager';

@Component
class ManagerPhoto extends Vue {
  @Prop() manager: any;

  /** 头像图片路径 */
  avatarUrl = '';

  /** 小封面 */
  frontCoverUrl = '';

  onLoad() {
    this.init();
  }

  onShow() {
    this.init();
  }

  init() {
    this.avatarUrl = getImageUrl(this.manager.ex.userInfo.photoUrl);
    this.frontCoverUrl = getImageUrl(this.manager.ex.userInfo.frontCoverUrl);
    // console.log('manager-photo', this.manager);
  }
}

export default ManagerPhoto;
