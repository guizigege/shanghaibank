import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store';
import { minLength, required } from 'vuelidate/lib/validators';

const validations = {
  hobby: { required, minLength: minLength(5) }
};

@Component({
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;
  hobby: string = '';
  count: number = 0;

  get validator() {
    return this.$v.hobby;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '兴趣' });
  }

  onShow() {
    store.commit('getLoginInfo');
    this.hobby = store.state.loginInfo.hobby;
    this.count = this.hobby ? this.hobby.length : 0;
  }

  inputEvent(e) {
    this.hobby = e.mp.detail.value;
    this.count = this.hobby.length;
  }

  async submit() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { hobby: this.hobby });
    }
  }

  onUnload() {
    this.hobby = '';
    store.commit('clearLoginInfo');
  }
}

export default Index;
