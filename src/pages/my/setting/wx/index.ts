import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  wxNumber: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  wxNumber: string = '';

  get validator() {
    return this.$v.wxNumber;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { wxNumber: this.wxNumber });
    }
  }

  wxEvent(e) {
    this.wxNumber = e.mp.detail.value;
  }

  onShow() {
    store.commit('getLoginInfo');
    const { wxNumber } = store.state.loginInfo;
    this.wxNumber = wxNumber;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '微信号' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
