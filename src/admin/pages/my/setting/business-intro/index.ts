import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  abstract: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  abstract: string = '';
  count: number = 0;

  get validator() {
    return this.$v.abstract;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { abstract: this.abstract });
    }
  }

  inputEvent(e) {
    this.abstract = e.mp.detail.value;
    this.count = this.abstract.length;
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      abstract
    } = JSON.parse(extendInfo).userInfo;
    this.abstract = abstract;
    this.count = abstract ? abstract.length : 0;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '业务简介' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
