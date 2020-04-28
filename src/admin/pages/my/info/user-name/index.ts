import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { minLength, required } from 'vuelidate/lib/validators';

const validations = {
  userName: { required, minLength: minLength(2) }
};

@Component({
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;
  userName: string = '';
  nameTitle: string = '';

  get validator() {
    return this.$v.userName;
  }

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '姓名' });
    if (options.nameTitle) {
      this.nameTitle = options.nameTitle;
      wx.setNavigationBarTitle({ title: options.nameTitle });
    }
  }

  onShow() {
    store.commit('getLoginInfo');
    this.userName = store.state.loginInfo.userName;
  }

  inputEvent(e) {
    this.userName = e.mp.detail.value;
  }

  async submit() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { userName: this.userName });
    }
  }

  onUnload() {
    this.userName = '';
    store.commit('clearLoginInfo');
  }
}

export default Index;
