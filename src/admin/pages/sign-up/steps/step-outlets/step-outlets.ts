import { Vue, Component } from 'vue-property-decorator';
import store from '../../store';
import DateTimePicker from '@/components/date-time-picker/date-time-picker';
import { AppUrls } from '@/utils/consts';
import { required, minLength } from 'vuelidate/lib/validators';
import { $Toast } from '@/../static/iview/base/index';
import Uploader from '@/components/uploader/uploader';

const validations = {
  vm: {
    bankName: { required, minLength: minLength(2) },
    weekdayAmStartHour: { required },
    weekdayAmEndHour: { required },
    weekdayPmStartHour: { required },
    weekdayPmEndHour: { required },
    holidayAmStartHour: { required },
    holidayAmEndHour: { required },
    holidayPmStartHour: { required },
    holidayPmEndHour: { required },
    // location: {
    //   name: { required }
    // }
  }
};

@Component({
  components: { DateTimePicker, Uploader },
  validations
})
class StepOutlets extends Vue {
  AppUrls = AppUrls;

  isLoaded = false;

  vm = this.resetVm();

  get validator() {
    return this.$v.vm;
  }

  get location() {
    return this.vm.location.name;
  }

  onShow() {
    // 小程序 hook
  }

  mounted() {
    // vue hook
  }

  onLoad() {
    this.init();
  }

  onUnload() {
    this.vm = this.resetVm();
    this.isLoaded = false;
    this.$v.$reset();
  }

  onChange(e?) {
    this.vm.bankName = e ? e.mp.detail.detail.value : this.vm.bankName;
    this.$v.vm!['bankName'].$touch();
  }

  async onSubmit() {
    if (this.$v.$anyError) {
      this.toast('请输入完整的信息');
    } else {
      try {
        const result = await store.dispatch('onSubmit', { ...this.vm });
        if (result === 'success') {
          wx.redirectTo({
            url: AppUrls.AUDIT_RESULT
          });
        } else {
          throw Error('提交失败');
        }
      } catch (e) {
        this.toast(e);
      }
    }
  }

  onPrev() {
    store.commit('onPrev');
  }

  onAfterUploaded(fileId) {
    this.vm.avatar = fileId;
  }

  onSelectLocation() {
    wx.chooseLocation({
      success: res => {
        if (res['errMsg'] === 'chooseLocation:ok') {
          const { name, address, latitude, longitude } = { ...res };
          this.vm.location = { name, address, latitude, longitude };
        } else {
          this.toast('网点定位失败');
        }
      },
      fail: () => this.toast('暂时无法打开地图，请稍后再试')
    });
  }

  private init() {
    wx.setNavigationBarTitle({ title: '注册信息' });
    Object.assign(this.vm, store.state.signUpInfo.submitInfo);
    this.isLoaded = true;
    this.onChange();
  }

  private resetVm() {
    return {
      avatar: '',
      bankName: '',
      weekdayAmStartHour: '08:30',
      weekdayAmEndHour: '12:00',
      weekdayPmStartHour: '14:00',
      weekdayPmEndHour: '17:30',
      holidayAmStartHour: '09:00',
      holidayAmEndHour: '11:30',
      holidayPmStartHour: '14:00',
      holidayPmEndHour: '16:30',
      location: {
        name: '',
        address: '',
        latitude: 0,
        longitude: 0
      }
    };
  }

  private toast(content, type = 'error') {
    $Toast({
      content,
      type
    });
  }
}

export default StepOutlets;
