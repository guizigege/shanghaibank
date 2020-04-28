import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  viewpoint: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  viewpoint: string = '';
  count: number = 0;

  get validator() {
    return this.$v.viewpoint;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { viewpoint: this.viewpoint });
    }
  }

  inputEvent(e) {
    this.viewpoint = e.mp.detail.value;
    this.count = this.viewpoint.length;
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      viewpoint
    } = JSON.parse(extendInfo).userInfo;
    this.viewpoint = viewpoint;
    this.count = viewpoint ? viewpoint.length : 0;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '个人观点' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
