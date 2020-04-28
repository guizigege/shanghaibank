import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  title: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  title: string = '';
  count: number = 0;
  business: any[] = [];
  businessType: number = 0;
  content: string = '';

  get validator() {
    return this.$v.title;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { title: this.title, businessType: this.businessType });
    }
  }

  bindPickerChange(e) {
    const index = Number(e.mp.detail.value);
    this.content = this.business[index].content;
    this.businessType = this.business[index].businessType;
  }

  inputEvent(e) {
    this.title = e.mp.detail.value;
    this.count = this.title.length;
  }

  async onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      title
    } = JSON.parse(extendInfo).userInfo;
    this.title = title;
    this.count = title ? title.length : 0;

    this.businessType = store.state.loginInfo.businessType;
    await store.dispatch('initBusinessTypes');
    this.business = store.state.business;

    this.business.forEach((c) => {
      if (c.businessType === this.businessType) {
        this.content = c.content;
      }
    });
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '工作职称' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
