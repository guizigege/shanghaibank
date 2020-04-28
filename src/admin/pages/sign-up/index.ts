import { EnumValues } from './../../../utils/enum-values';
import { Vue, Component } from 'vue-property-decorator';
import store from '../sign-up/store';
import StepType from './steps/step-type/step-type';
import StepOutlets from './steps/step-outlets/step-outlets';
import StepAddress from './steps/step-address/step-address';
import { AppUrls } from '@/utils/consts';
import { SignUpType } from '@/models/enums';
import StepManagerInfo from './steps/step-manager-info/step-manager-info';

const debug = require('@/utils/debug')('log:Admin/SignUp');

@Component({
  components: {
    StepType,
    StepOutlets,
    StepAddress,
    StepManagerInfo
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  get step() {
    return store.state.step;
  }

  get isManager() {
    return (
      store.state.signUpInfo.submitType ===
      EnumValues.getNameFromValue(SignUpType, SignUpType.客户经理)
    );
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  onLoad(query) {
    if (query && query.type && query.type === 'edit') {
      store.commit('initEditInfo');
    }
  }

  async mounted() {
    // vue hook
    debug('mounted');

    await store.dispatch('initBankList');
    await store.dispatch('initBusinessTypes');
  }
}

export default Index;
