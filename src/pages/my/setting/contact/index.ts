import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { phoneNumber } from '@/utils/validator-rules';
import { required } from 'vuelidate/lib/validators';
import store from './store';
import service from '@/api/service/admin';
import { $Toast } from 'static/iview/base';

const validations = {
  phone: { required, phoneNumber },
  codeNumber: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  phone: string = '';
  codeNumber: string = '';

  codeTitle: string = '获取验证码';
  codeColor: string = 'blue';
  countDown: number = 60;
  countTime: any = '';

  get validator() {
    return this.$v.phone && this.$v.codeNumber;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      service.verifySMS({ mobile: this.phone, type: 1, code: this.codeNumber }).then(async () => {
        await store.dispatch('saveInfo', { mobile: this.phone });
      }).catch(err => {
        $Toast({
          content: err,
          type: 'error'
        });
      });
    }
  }

  phoneEvent(e) {
    this.phone = e.mp.detail.value;
  }

  codeEvent(e) {
    this.codeNumber = e.mp.detail.value;
  }

  getVCode() {
    if (this.countTime !== '') {
      return;
    }
    if (this.$v!['phone']['$invalid']) {
      $Toast({
        content: '请检查手机号码',
        type: 'error'
      });
      return;
    }
    service.sendSMS({ mobile: this.phone, type: 1 }).then(() => {
      this.codeTitle = this.countDown.toString();
      this.codeColor = 'default';
      this.countTime = setInterval(() => {
        this.countDown--;
        this.codeTitle = this.countDown.toString();
        if (this.countDown === 0) {
          this.codeTitle = '获取验证码';
          this.countDown = 60;
          this.codeColor = 'blue';
          clearInterval(this.countTime);
          this.countTime = '';
        }
      }, 1000);
    });
  }

  onShow() {
    store.commit('getLoginInfo');
    const { mobile } = store.state.loginInfo;
    this.phone = mobile;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '手机号码' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
