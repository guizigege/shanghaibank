import { Vue, Component, Prop } from 'vue-property-decorator';
import storage from '@/utils/storage';
import { getImageUrl } from '@/utils';
import auth from '@/api/auth';

@Component
class MyHeader extends Vue {
  @Prop() url: string;
  avatar = '';
  desc = '';
  userName = '';

  jumpInfo() {
    wx.navigateTo({
      url: this.url
    });
  }

  onLoad() {
    this.initDate();
  }

  onShow() {
    this.initDate();
  }

  initDate() {
    const loginInfo = storage.get('loginInfo');
    this.avatar = getImageUrl(loginInfo.icon);
    this.userName = auth.isBranch ?
      loginInfo.branch : auth.isOffice ?
        loginInfo.office : auth.isManager ?
          (loginInfo.nick || loginInfo.userName) : auth.isClientApp ? loginInfo.userName : '完善下昵称吧';
    this.desc = loginInfo.desc || '写点东西介绍下自己吧~';
  }

  onHide() {
    // console.log('my-header onhide');
  }

  onUnload() {
    // console.log('my-header unload');
  }
}

export default MyHeader;
