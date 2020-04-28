import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { minLength, required } from 'vuelidate/lib/validators';

const validations = {
  realName: { required, minLength: minLength(2) }
};

@Component({
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;
  realName: string = '';

  get validator() {
    return this.$v.realName;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '姓名' });
  }

  onShow() {
    store.commit('getLoginInfo');
    this.realName = store.state.loginInfo.realName;
  }

  inputEvent(e) {
    this.realName = e.mp.detail.value;
  }

  async submit() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { realName: this.realName });
    }
  }

  onUnload() {
    this.realName = '';
    store.commit('clearLoginInfo');
  }
}

export default Index;
