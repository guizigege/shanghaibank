import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import storage from '@/utils/storage';
import { getImageUrl } from '@/utils';
import Contacts from '../contacts/contacts';

@Component({
  components: {
    Contacts
  }
})

class CardManagerInfo extends Vue {
  AppUrls = AppUrls;

  @Prop() manager: any;

  manageImg = '';

  companyLogo = '';

  onLoad() {
    this.manageImg = getImageUrl(this.manager.ex.userInfo.frontCoverUrl);
  }

  onShow() {
    this.manageImg = getImageUrl(this.manager.ex.userInfo.frontCoverUrl);
  }

  @Emit('click')
  onSelectManager() {
    storage.set('manageDetail', JSON.stringify(this.manager));
  }
}

export default CardManagerInfo;
