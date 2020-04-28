import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { $Toast } from '@/../static/iview/base/index';
import { required } from 'vuelidate/lib/validators';
import { phoneNumber } from '@/utils/validator-rules';
import storage from '@/utils/storage';
import { handleError } from '@/utils';
import admin from '@/api/service/admin';
import client from '@/api/service/client';

const validations = {
  vm: {
    name: { required },
    phone: { required, phoneNumber },
    code: { required }
  }
};

@Component({
  validations
})
class GroupBuyModal extends Vue {
  @Prop() visible: boolean;
  @Prop() buyType: number;
  @Prop() groupId: number;
  @Prop() productId: number;

  vm = {
    name: '',
    phone: '',
    code: ''
  };
  type = {
    1: '单独预约',
    2: '立即加入',
    3: '发起拼团'
  };
  text: any = '获取验证码';
  time: any = {};
  loginInfo: any = {};
  dirty: boolean = false; // 初始化时带有默认信息
  diff: boolean = false; // 初始化信息是否改变

  mounted() {
    this.init();
  }

  onShow() {
    this.init();
  }

  init() {
    this.loginInfo = storage.get('loginInfo');
    this.vm.name = this.loginInfo.realName;
    this.vm.phone = this.loginInfo.mobile;
    if (this.vm.name !== '' && this.vm.phone !== '') {
      this.dirty = true;
      this.vm.code = '给个默认值而已啦';
    }
  }

  get validator() {
    return this.$v.vm;
  }

  // 获取验证码
  onGetCode() {
    admin.sendSMS({ mobile: this.vm.phone, type: 1 }).then(() => {
      this.text = 60;
      this.time = setInterval(() => {
        --this.text;
        if (this.text <= 0) {
          clearInterval(this.time);
          this.text = '获取验证码';
        }
      }, 1000);
    });
  }

  @Emit('closeToOrder')
  closeModal() {
    this.visible = false;
    clearInterval(this.time);
    this.text = '获取验证码';
  }

  nameInput(e) {
    this.vm.name = e.mp.detail.value;
    this.$v.vm!['name'].$touch();
  }

  phoneInput(e) {
    this.vm.phone = e.mp.detail.value;
    this.$v.vm!['phone'].$touch();
    if (this.vm.phone !== this.loginInfo.mobile) {
      this.diff = true;
      this.vm.code = '给个默认值而已啦';
    } else {
      this.diff = false;
      this.vm.code = '';
    }
  }

  phoneBlur() {
    if (this.vm.phone !== this.loginInfo.mobile) {
      this.diff = true;
      this.vm.code = '给个默认值而已啦';
    } else {
      this.diff = false;
      this.vm.code = '';
    }
  }

  // GO GO GO
  async onStartGroup() {
    if (!this.$v.$invalid) {
      if (this.diff) {
        admin.verifySMS({ mobile: this.vm.phone, type: 1, code: this.vm.code }).then(async () => {
          await this.req();
        }).catch(err => {
          $Toast({ content: err, type: 'error' });
        });
      } else {
        await this.req();
      }
      await this.saveInfo();
    }
  }

  async req() {
    if (this.buyType === 1) {
      await this.appointment();
    }
    if (this.buyType === 2) {
      await this.onGoGroupBuy();
    }
    if (this.buyType === 3) {
      await this.startGroup();
    }
  }

  // 单独预约
  async appointment() {
    try {
      await client.order(this.productId);
      $Toast({
        content: '预约成功',
        type: 'success'
      });
      this.closeModal();
      this.$emit('orderSuccess');
    } catch (err) {
      handleError(err || '预约失败，请稍后再试');
    }
  }

  // 发起拼团
  async startGroup() {
    try {
      await client.startGroup(this.productId);
      $Toast({
        content: '成功发起拼团',
        type: 'success'
      });
      this.closeModal();
      this.$emit('groupSuccess');
    } catch (err) {
      handleError(err || '拼团失败，请稍后再试');
    }
  }

  // 参团
  async onGoGroupBuy() {
    try {
      const res = await client.takeGroup({
        productId: this.productId,
        groupId: this.groupId
      });
      $Toast({
        content: '参拼成功',
        type: 'success'
      });
      this.$emit('joinSuccess', res);
      this.closeModal();
    } catch (err) {
      handleError(err || '拼团失败，请稍后再试');
    }
  }

  // 更新资料
  async saveInfo() {
    const d = {
      realName: this.vm.name,
      mobile: this.vm.phone
    };
    admin.saveInfo(d).then(() => {
      Object.assign(this.loginInfo, d);
      storage.set('loginInfo', this.loginInfo);
    });
  }

  onEdit() {
    this.vm = {
      name: '',
      phone: '',
      code: ''
    };
    this.loginInfo = {};
  }
}

export default GroupBuyModal;
