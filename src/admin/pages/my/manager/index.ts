import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import MyHeader from '@/components/my-header/my-header';

@Component({
  components: {
    MyHeader
  }
})
class MyManager extends Vue {
  @Prop() count: {
    focusCount: number,
    fensCount: number,
    commentCount: number
  };
  AppUrls = AppUrls;
  isLoad: boolean = false;

  onLoad() {
    this.isLoad = true;
  }

  onShow() {
    this.isLoad = true;
  }

  onHide() {
    this.isLoad = false;
  }

  onUnload() {
    this.isLoad = false;
    this.count.focusCount = 0;
    this.count.fensCount = 0;
    this.count.commentCount = 0;
  }

  jumpAttention() {
    wx.navigateTo({
      url: AppUrls.ADMIN_MY_ATTENTION
    });
  }

  jumpFan() {
    wx.navigateTo({
      url: AppUrls.ADMIN_MY_FANS
    });
  }

  jumpComment() {
    wx.navigateTo({
      url: AppUrls.ADMIN_MY_COMMENTS
    });
  }
}

export default MyManager;
