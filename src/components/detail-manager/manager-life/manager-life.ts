import { Vue, Component, Prop } from 'vue-property-decorator';
import { EmptyManage, Manager } from '@/models/manager';
import { getImageUrl } from '@/utils';

@Component
class ManagerLife extends Vue {
  @Prop() manager: Manager;

  photoUrl = '';

  onLoad() {
    this.photoUrl = getImageUrl(this.manager.ex.userInfo.photoUrl);
  }

  onShow() {
    this.photoUrl = getImageUrl(this.manager.ex.userInfo.photoUrl);
  }

  onUnload() {
    this.manager = EmptyManage;
    this.photoUrl = '';
  }
}

export default ManagerLife;
