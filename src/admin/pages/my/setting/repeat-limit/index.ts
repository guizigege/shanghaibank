import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import store from '../store';

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;
  showModal: boolean = false;
  current: string = '';
  limit: boolean = false;
  IntervalDays: string = '';
  count: string = '';
  type = {
    office: '同一网点',
    redPacket: '同一红包',
    product: '同一优品',
    active: '同一活动'
  };
  red: any = {
    office: {
      isLimit: true,
      IntervalDays: '',
      count: ''
    },
    redPacket: {
      isLimit: true,
      IntervalDays: '',
      count: ''
    },
    product: {
      isLimit: true,
      IntervalDays: '',
      count: ''
    },
    active: {
      isLimit: true,
      IntervalDays: '',
      count: ''
    }
  };
  office = '';
  redPacket = '';
  product = '';
  active = '';

  setSome(type) {
    this.showModal = true;
    this.current = type;
    this.limit = this.red[type].isLimit;
    if (!this.red[type].isLimit) {
      this.IntervalDays = this.red[type].IntervalDays;
      this.count = this.red[type].count;
    }
  }

  limitChange(e) {
    this.limit = e.mp.detail.value;
    this.IntervalDays = '';
    this.count = '';
  }

  async okEvent() {
    this.red[this.current].IntervalDays = this.IntervalDays;
    this.red[this.current].count = this.count === '' ? 0 : this.count;
    this.red[this.current].isLimit = this.limit;
    await store.dispatch('setRed', this.red);
    if (this.red[this.current].isLimit) {
      this[this.current] = '有限制';
    } else {
      this[this.current] = `+${this.red[this.current].count}元/${this.red[this.current].IntervalDays}天`;
    }
    this.showModal = false;
  }

  countInput(e) {
    this.count = e.mp.detail.value.replace(/^[0]*/, '');
  }

  dayInput(e) {
    this.IntervalDays = e.mp.detail.value.replace(/^[0]*/, '');
  }

  closeModal() {
    this.showModal = false;
    this.IntervalDays = '';
    this.count = '';
  }

  async onLoad() {
    wx.setNavigationBarTitle({ title: '重复限制' });
    await store.dispatch('getRed');
    this.red = store.state.red;
    console.log('onload', this.red);
    this.init();
  }

  init() {
    for (let k in this.type) {
      if (this.type.hasOwnProperty(k)) {
        if (this.red[k].isLimit) {
          this[k] = '有限制';
        } else {
          this[k] = `+${this.red[k].count}元/${this.red[k].IntervalDays}天`;
        }
      }
    }
  }

  onUnload() {
    this.IntervalDays = '';
    this.count = '';
  }
}

export default Index;
