import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import auth from '@/api/auth';
import store from './store';
import { getImageUrl, isValidJSON } from '@/utils';
import service from '@/api/service/admin';
import { $Toast } from 'static/iview/base';

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  isBranch: boolean = false;
  isOffice: boolean = false;
  isManager: boolean = false;
  coverUrl: string = ''; // 网点封面
  abstract: string = ''; // 业务简介
  mobile: string = ''; // 手机号码
  wxNumber: string = ''; // 微信号
  office: string = ''; // 所属网点
  showModal: boolean = false;
  current: string = '';
  red: any = {
    money: 0, // 起发金额
    average: 0, // 红包均额
    limit: 0, // 日领上限
    limitMoney: 0, // 上限额度
    IntervalDays: '', // 间隔天数
    rate: 0 // 佣金比例
  };
  money: string = ''; // 起发金额
  average: string = ''; // 红包均额
  limit: string = ''; // 日领上限
  limitSet: string = ''; // 上限额度
  rate: string = '';// 佣金比例

  async onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const vm = JSON.parse(extendInfo);
    this.abstract = vm.userInfo.abstract ? '' : '未添加';
    this.coverUrl = vm.userInfo.coverUrl ? getImageUrl(vm.userInfo.coverUrl) : '0';
    this.mobile = store.state.loginInfo.mobile;
    this.wxNumber = store.state.loginInfo.wxNumber;
    this.office = store.state.loginInfo.office;
  }

  async onLoad() {
    wx.setNavigationBarTitle({ title: '设置' });
    this.isBranch = auth.isBranch;
    this.isOffice = auth.isOffice;
    this.isManager = auth.isManager;
    if (this.isBranch) {
      await store.dispatch('getRed');
      this.red = store.state.red;
      this.money = this.red.money + '元'; // 起发金额
      this.average = this.red.average + '元'; // 红包均额
      this.limit = this.red.limit + '个'; // 日领上限
      this.limitSet = `+${this.red.limitMoney}元/${this.red.IntervalDays}天`; // 上限额度
      this.rate = `${this.red.rate}%`; // 佣金比例
    }
  }

  setCoverUrl() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => this.upload(res.tempFilePaths)
    });
  }

  setSome(type) {
    this.showModal = true;
    this.current = type;
  }

  closeModal() {
    this.showModal = false;
  }

  setRedValue(i, e) {
    if (i === 1) {
      this.red.money = e.mp.detail.detail.value.replace(/^[0]*/, '');
    }
    if (i === 2) {
      this.red.average = e.mp.detail.detail.value;
    }
    if (i === 3) {
      this.red.limit = e.mp.detail.detail.value.replace(/^[0]*/, '');
    }
    if (i === 4) {
      this.red.limitMoney = e.mp.detail.detail.value;
    }
    if (i === 5) {
      this.red.IntervalDays = e.mp.detail.detail.value.replace(/^[0]*/, '');
    }
    if (i === 6) {
      this.red.rate = e.mp.detail.detail.value;
    }
  }

  async okEvent() {
    for (let i in this.red) {
      if (i !== 'IntervalDays' && this.red[i] === '') {
        this.red[i] = 0;
      }
    }
    await store.dispatch('setRed', this.red);
    this.red = store.state.red;
    this.money = `${this.red.money}元`; // 起发金额
    this.average = `${this.red.average}元`; // 红包均额
    this.limit = `${this.red.limit}个`; // 日领上限
    this.limitSet = `+${this.red.limitMoney}元/${this.red.IntervalDays}天`; // 上限额度
    this.rate = `${this.red.rate}%`; // 佣金比例
    this.showModal = false;
  }

  upload(files) {
    service
      .uploadFile(files.toString())
      .then(async res => {
        if (isValidJSON(`${res.toString()}`)) {
          const params = JSON.parse(`${res}`);
          const coverUrl = params['data']['fileId'];
          await store.dispatch('saveInfo', { coverUrl: coverUrl });
          this.coverUrl = getImageUrl(coverUrl);
        }
      })
      .catch(() => {
        $Toast({
          content: '封面上传失败',
          type: 'error'
        });
      });
  }

  onUnload() {
    store.commit('clearLoginInfo');
    this.showModal = false;
    this.current = '';
    this.red = {
      money: 0, // 起发金额
      average: 0, // 红包均额
      limit: 0, // 日领上限
      limitMoney: 0, // 上限额度
      IntervalDays: '', // 间隔天数
      rate: 0 // 佣金比例
    };
    this.money = ''; // 起发金额
    this.average = ''; // 红包均额
    this.limit = ''; // 日领上限
    this.limitSet = ''; // 上限额度
    this.rate = '';// 佣金比例
  }
}

export default Index;
