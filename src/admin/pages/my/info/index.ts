import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import auth from '@/api/auth';
import { getImageUrl, isValidJSON } from '@/utils';
import { EmptyLoginInfo, LoginInfo } from '@/models/user';
import service from '@/api/service/admin';
import store from './store';
import { $Toast } from 'static/iview/base';
import { Gender } from '@/models/enums';

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;
  loginInfo: LoginInfo = EmptyLoginInfo;
  avatar: string = '';
  nameTitle: string = '';
  isManager: boolean = false;
  gender: any = {};
  nameUrl: string = '';

  onShow() {
    store.commit('getLoginInfo');
    this.loginInfo = store.state.loginInfo;
    this.avatar = getImageUrl(this.loginInfo.icon);
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '个人信息' });
    this.isManager = auth.isManager;
    this.gender = Gender;
    if (auth.isManager) {
      this.nameTitle = '姓名';
    }
    if (auth.isOffice) {
      this.nameTitle = '网点名';
    }
    if (auth.isBranch) {
      this.nameTitle = '分行名';
    }
    if (auth.isClientApp) {
      this.nameTitle = '昵称';
    }
    this.nameUrl = `${AppUrls.ADMIN_MY_INFO_USERNAME}?nameTitle=${this.nameTitle}`;
  }

  setAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => this.upload(res.tempFilePaths)
    });
  }

  setGender() {
    const that = this;
    wx.showActionSheet({
      itemList: ['未知', '男', '女'],
      async success(res) {
        if (res.tapIndex !== that.loginInfo.gender) {
          await store.dispatch('saveInfo', { gender: res.tapIndex });
          that.loginInfo = store.state.loginInfo;
        }
      }
    });
  }

  upload(files) {
    service
      .uploadFile(files.toString())
      .then(async res => {
        if (isValidJSON(`${res.toString()}`)) {
          const params = JSON.parse(`${res}`);
          const icon = params['data']['fileId'];
          await store.dispatch('saveInfo', { icon: icon });
          this.loginInfo = store.state.loginInfo;
          this.avatar = getImageUrl(icon);
        }
      })
      .catch(() => {
        $Toast({
          content: '头像上传失败',
          type: 'error'
        });
      });
  }

  onUnload() {
    this.loginInfo = EmptyLoginInfo;
    store.commit('clearLoginInfo');
    this.nameTitle = '';
  }
}

export default Index;
