import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { getImageUrl, handleError } from '@/utils';
import { FocusState } from '@/models/enums';
import service from '@/api/service/client';

@Component
class CardManagerInfo extends Vue {
  AppUrls = AppUrls;

  @Prop() user: any;
  @Prop({ default: false }) needFocus: boolean;

  focusState: number = 0;

  onLoad() {
    this.user.realIcon = getImageUrl(this.user.icon);
    this.focusState = this.user.focusState;
    // console.log('card-fans-info', 'onLoad', this.user);
  }

  onShow() {
    this.user.realIcon = getImageUrl(this.user.icon);
    this.focusState = this.user.focusState;
    // console.log('card-fans-info', 'onShow', this.user);
  }

  async focusEvent() {
    const prevState = this.user.focusState;
    this.user.focusState = this.user.focusState === FocusState.Cancel ? FocusState.Focus : FocusState.Cancel;
    this.focusState = this.user.focusState;
    try {
      await service.updateFocusState(this.user.userId, this.user.focusState);
      return true;
    } catch (error) {
      this.user.focusState = prevState;
      this.focusState = prevState;
      handleError(error);
      return false;
    }
  }

  onHide() {
    this.needFocus = false;
    this.user = null;
    this.focusState = 0;
    // console.log('card-fans-info', 'onHide', this.user);
  }

  @Emit('info')
  userDetail() {
    return this.user;
  }
}

export default CardManagerInfo;
