import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { FocusState } from '@/models/enums';
import service from '@/api/service/client';
import { handleError } from '@/utils';

@Component
class FocusMsg extends Vue {
  @Prop() info: any;

  isLoad: boolean = false;
  focusState: number = 0;

  onLoad() {
    this.focusState = this.info.focusState;
    this.isLoad = true;
    // console.log(this.info);
  }

  onShow() {
    this.focusState = this.info.focusState;
    this.isLoad = true;
    // console.log(this.info);
  }

  // onHide() {
  //   this.focusState = 0;
  //   this.isLoad = false;
  //   this.info = null;
  // }

  @Emit('focus')
  async focusEvent() {
    const prevState = this.info.focusState;
    this.info.focusState = this.info.focusState === FocusState.Cancel ? FocusState.Focus : FocusState.Cancel;
    this.focusState = this.info.focusState;
    try {
      await service.updateFocusState(this.info.userId, this.info.focusState);
      return true;
    } catch (error) {
      this.info.focusState = prevState;
      this.focusState = prevState;
      handleError(error);
      return false;
    }
  }

  @Emit('send')
  sendMsg() {
    return 'send';
  }
}

export default FocusMsg;
