import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { formatTime, getImageUrl } from '@/utils';

@Component
class CardRedReceive extends Vue {
  AppUrls = AppUrls;

  @Prop() info: any;

  onLoad() {
    this.info.realIcon = getImageUrl(this.info.icon);
    this.info.releaseTime = formatTime(this.info.createTime);
    // console.log('card-red-receive', 'onLoad', this.info);
  }

  onShow() {
    this.info.realIcon = getImageUrl(this.info.icon);
    this.info.releaseTime = formatTime(this.info.createTime);
    // console.log('card-red-receive', 'onLoad', this.info);
  }

  @Emit('user')
  userDetail() {
    return this.info;
  }
}

export default CardRedReceive;
