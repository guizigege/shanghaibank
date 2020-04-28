import { Vue, Component, Prop } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import storage from '@/utils/storage';
import service from '@/api/service/admin';
import { $Toast } from '../../../../../static/iview/base';
import MyHeader from '@/components/my-header/my-header';

@Component({
  components: {
    MyHeader
  }
})
class MyBranch extends Vue {
  @Prop() count: {
    bannerHomeCount: number,
    bannerLocationCount: number,
    commentCount: number
  };
  AppUrls = AppUrls;
  location = ''; // 定位
  isLoad: boolean = false;

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
    this.count.bannerLocationCount = 0;
    this.count.bannerHomeCount = 0;
    this.count.commentCount = 0;
  }

  initDate() {
    const loginInfo = storage.get('loginInfo');
    try {
      this.location = JSON.parse(loginInfo.location).address;
    } catch (e) {
      this.location = '未设置地址信息';
    }
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

export default MyBranch;
