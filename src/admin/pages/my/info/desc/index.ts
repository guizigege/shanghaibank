import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { minLength, required } from 'vuelidate/lib/validators';

const validations = {
  desc: { required, minLength: minLength(5) }
};

@Component({
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;
  desc: string = '';

  get validator() {
    return this.$v.desc;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '描述' });
  }

  onShow() {
    store.commit('getLoginInfo');
    this.desc = store.state.loginInfo.desc;
  }

  inputEvent(e) {
    this.desc = e.mp.detail.value;
  }

  async submit() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { desc: this.desc });
    }
  }

  onUnload() {
    this.desc = '';
    store.commit('clearLoginInfo');
  }
}

export default Index;
