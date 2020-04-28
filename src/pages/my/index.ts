import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import MyHeader from '@/components/my-header/my-header';
import service from '@/api/service/client';
import storage from '@/utils/storage';

@Component({
  components: {
    MyHeader
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  isLoad: boolean = false;
  collectCount: number = 0;
  focusCount: number = 0;
  fensCount: number = 0;

  get loginInfo() {
    return storage.get('loginInfo');
  }

  async onShow() {
    const res = await service.getInfoCount(this.loginInfo.userId);
    this.isLoad = true;
    this.collectCount = res.collectCount;
    this.focusCount = res.focusCount;
    this.fensCount = res.fensCount;
  }

  onHide() {
    this.isLoad = false;
    this.collectCount = 0;
    this.focusCount = 0;
    this.fensCount = 0;
  }

  onUnload() {
    this.isLoad = false;
    this.collectCount = 0;
    this.focusCount = 0;
    this.fensCount = 0;
  }

  toCollection() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_MY_COLLECTION}`
    });
  }

  jumpAttention() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_MY_ATTENTION_LIST}`
    });
  }

  jumpFans() {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_MY_FANS_LIST}`
    });
  }
}

export default Index;
