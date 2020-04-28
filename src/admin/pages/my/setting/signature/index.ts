import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  signature: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  signature: string = '';
  count: number = 0;

  get validator() {
    return this.$v.signature;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { signature: this.signature });
    }
  }

  inputEvent(e) {
    this.signature = e.mp.detail.value;
    this.count = this.signature.length;
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      signature
    } = JSON.parse(extendInfo).userInfo;
    this.signature = signature;
    this.count = signature ? signature.length : 0;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '签名' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
