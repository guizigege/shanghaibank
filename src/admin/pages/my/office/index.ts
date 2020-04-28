import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import storage from '@/utils/storage';
import { $Toast } from '@/../static/iview/base/index';
import service from '../../../../api/service/admin';
import MyHeader from '@/components/my-header/my-header';

@Component({
  components: {
    MyHeader
  }
})
class MyOffice extends Vue {
  @Prop() count: {
    focusCount: number,
    fensCount: number,
    commentCount: number
  };
  AppUrls = AppUrls;
  location = ''; // 定位
  isLoad: boolean = false;

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

  onLoad() {
    this.isLoad = true;
    this.initDate();
  }

  onShow() {
    this.isLoad = true;
    this.initDate();
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

  initDate() {
    const loginInfo = storage.get('loginInfo');
    this.location = JSON.parse(loginInfo.location).address;
  }

  selectLocation() {
    wx.chooseLocation({
      success: res => {
        if (res['errMsg'] === 'chooseLocation:ok') {
          const { name, address, latitude, longitude } = { ...res };
          const loginInfo = storage.get('loginInfo');
          const req = { name, address, latitude, longitude };
          loginInfo.location = JSON.stringify(req);
          storage.set('loginInfo', loginInfo);
          service.saveBankLocation({ location: JSON.stringify(req) }).catch(err => {
            $Toast({
              content: err,
              type: 'error'
            });
          });
        } else {
          $Toast('网点定位失败');
        }
      },
      fail: () => $Toast('暂时无法打开地图，请稍后再试')
    });
  }
}

export default MyOffice;
