import { Vue, Component } from 'vue-property-decorator';
import DateTimePicker from '@/components/date-time-picker/date-time-picker';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  vm: {
    weekdayAmStartHour: { required },
    weekdayAmEndHour: { required },
    weekdayPmStartHour: { required },
    weekdayPmEndHour: { required },
    holidayAmStartHour: { required },
    holidayAmEndHour: { required },
    holidayPmStartHour: { required },
    holidayPmEndHour: { required }
  }
};

@Component({
  components: {
    DateTimePicker
  },
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  vm = {
    weekdayAmStartHour: '',
    weekdayAmEndHour: '',
    weekdayPmStartHour: '',
    weekdayPmEndHour: '',
    holidayAmStartHour: '',
    holidayAmEndHour: '',
    holidayPmStartHour: '',
    holidayPmEndHour: ''
  };

  get validator() {
    return this.$v.vm;
  }

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', this.vm);
    }
  }

  onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      weekdayAmStartHour,
      weekdayAmEndHour,
      weekdayPmStartHour,
      weekdayPmEndHour,
      holidayAmStartHour,
      holidayAmEndHour,
      holidayPmStartHour,
      holidayPmEndHour
    } = JSON.parse(extendInfo).userInfo;
    this.vm.holidayAmEndHour = holidayAmEndHour;
    this.vm.holidayPmStartHour = holidayPmStartHour;
    this.vm.holidayPmEndHour = holidayPmEndHour;
    this.vm.holidayAmStartHour = holidayAmStartHour;
    this.vm.weekdayPmEndHour = weekdayPmEndHour;
    this.vm.weekdayPmStartHour = weekdayPmStartHour;
    this.vm.weekdayAmEndHour = weekdayAmEndHour;
    this.vm.weekdayAmStartHour = weekdayAmStartHour;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '营业时间' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
