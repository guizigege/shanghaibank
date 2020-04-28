import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import store from './store';

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  tags: any[] = [];
  check: boolean = true; // true 不合格

  async submitInfo() {
    if (!this.check) {
      await store.dispatch('saveInfo', { tags: this.tags });
    }
  }

  inputEvent(e, i) {
    this.tags[i] = e.mp.detail.value;
    this.checkTag();
  }

  checkTag() {
    if (this.tags.length > 0) {
      const m = this.tags.filter(c => !c);
      if (m.length > 0) {
        this.check = true;
      } else {
        this.check = false;
      }
    }
    if (this.tags.length < 3) {
      this.check = true;
    }
    if (this.tags.length === 0) {
      this.check = true;
    }
    return false;
  }

  addEvent() {
    if (this.tags.length > 5) {
      return;
    }
    const m = this.tags.filter(c => !c);
    if (m.length > 0) {
      return;
    }
    this.tags.push('');
    this.checkTag();
  }

  lessEvent(i) {
    this.tags.splice(i, 1);
    this.checkTag();
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      tags
    } = JSON.parse(extendInfo).userInfo;
    this.tags = tags || [];
    this.checkTag();
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '标签' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
    this.tags = [];
    this.check = true;
  }
}

export default Index;
