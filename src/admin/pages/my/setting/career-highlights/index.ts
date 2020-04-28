import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  highlights: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  highlights: string = '';
  count: number = 0;

  get validator() {
    return this.$v.highlights;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { highlights: this.highlights });
    }
  }

  inputEvent(e) {
    this.highlights = e.mp.detail.value;
    this.count = this.highlights.length;
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      highlights
    } = JSON.parse(extendInfo).userInfo;
    this.highlights = highlights;
    this.count = highlights ? highlights.length : 0;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '职业亮点' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
