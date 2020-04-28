import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { getImageUrl } from '@/utils';

@Component
class CardManagerInfo extends Vue {
  AppUrls = AppUrls;

  @Prop() user: any;

  onLoad() {
    this.user.realIcon = getImageUrl(this.user.icon);
  }

  onShow() {
    this.user.realIcon = getImageUrl(this.user.icon);
  }

  @Emit('sendMsg')
  sendMsg() {
    return this.user;
  }

  @Emit('info')
  userInfo() {
    return this.user;
  }
}

export default CardManagerInfo;
