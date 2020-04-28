import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';
import uploader from '@/components/uploader/uploader';

const validations = {
  life: { required },
  photoUrl: { required }
};

@Component({
  components: {
    uploader
  },
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  life: string = '';
  photoUrl: string = '';
  count: number = 0;
  dis = true; // 控制上传图片组件

  get validator() {
    return this.$v.life && this.$v.photoUrl;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { life: this.life, photoUrl: this.photoUrl });
    }
  }

  removeEvent() {
    this.photoUrl = '';
  }

  uploadEvent(url) {
    this.photoUrl = url;
  }

  inputEvent(e) {
    this.life = e.mp.detail.value;
    this.count = this.life.length;
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      life, photoUrl
    } = JSON.parse(extendInfo).userInfo;
    this.life = this.life || life;
    this.count = life ? life.length : 0;
    this.photoUrl = photoUrl;
    this.dis = true;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '我·生活' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
    this.life = '';
    this.photoUrl = '';
    this.dis = false;
  }
}

export default Index;
