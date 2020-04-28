import { Vue, Component } from 'vue-property-decorator';
import SelectBank from '@/components/select/select';
import store from '../../store';

@Component({
  components: {
    SelectBank
  }
})
class StepAddress extends Vue {
  // 选择网点
  index = 0;

  get address() {
    return store.state.bankList;
  }

  onShow() {
    // 小程序 hook
  }

  mounted() {
    // vue hook
    wx.setNavigationBarTitle({ title: '选择网点' });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#888888',
    });
    this.init();
  }

  onAddressChange(e) {
    this.index = +e.mp.detail.value;
    store.commit('selectedOffice', this.address[this.index]);
  }

  onNext() {
    store.commit('onNext');
  }

  onPrev() {
    store.commit('onPrev');
  }

  private init() {
    if (
      store.state.signUpInfo.submitInfo &&
      store.state.signUpInfo.office
    ) {
      this.index =
        this.address.findIndex(
          x => x === store.state.signUpInfo.office
        ) || 0;
    }

    store.commit('selectedOffice', this.address[this.index]);
  }
}

export default StepAddress;
