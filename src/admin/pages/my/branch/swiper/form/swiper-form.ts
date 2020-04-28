import { Component, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { AppUrls } from '@/utils/consts.ts';
import { required, minLength } from 'vuelidate/lib/validators';
import { SwiperType } from '@/models/enums';
import Uploader from '@/components/uploader/uploader';
import DateTimePicker from '@/components/date-time-picker/date-time-picker';
import store from '../store';
import FormMixin from '@/utils/form-mixins';

const debug = require('@/utils/debug')('log:Admin/My/Branch/Swiper/SwiperForm');

const validations = {
  vm: {
    name: { required, minLength: minLength(2) },
    imageUrl: { required },
    beginDate: {},
    beginTime: {},
    endDate: {},
    endTime: { required },
    index: { required }
  }
};

@Component({
  components: {
    DateTimePicker,
    Uploader
  },
  validations
})
class SwiperForm extends mixins(FormMixin) {
  AppUrls = AppUrls;

  officeIndex = 0;

  productIndex = 0;

  selectedProduct = '';

  vm = this.resetVm();

  get validator() {
    return this.$v.vm;
  }

  get item() {
    return store.state.form.item;
  }

  get officeList() {
    return store.state.form.officeList;
  }

  get productList() {
    return store.state.form.productList;
  }

  @Watch('vm', { immediate: true, deep: true })
  onVmChanged(val) {
    if (this.isLoaded) {
      store.commit('setValidEntity', {
        item: this.convertToEntity()
      });
    }
  }

  onLoad() {
    debug('onLoad');

    this.init();
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');

    // this.onOfficeChange();
  }

  onRemoveImageUrl(index) {
    this.vm.imageUrl = this.removeUrl(this.vm.imageUrl, index);
  }

  onUploadImageUrl(url) {
    this.vm.imageUrl = this.addUrl(this.vm.imageUrl, url);
  }

  async onOfficeChange(e?) {
    this.officeIndex = e ? +e.mp.detail.value : this.officeIndex;
    const selectedOffice = this.officeList[this.officeIndex];

    await store.dispatch('initOfficeProduct', selectedOffice);

    this.cleanSelectedProduct();

    this.vm.office = selectedOffice;
  }

  onProductChange(e?) {
    this.productIndex = e ? +e.mp.detail.value : this.productIndex;

    if (this.productIndex > 0 && this.productList.length > 0) {
      this.selectedProduct = this.productList[this.productIndex]['title'];
      this.vm.productId = this.productList[this.productIndex]['productId'];
    }
  }

  async onSubmit() {
    await store.dispatch('submit');
    // wx.redirectTo({
    //   url: AppUrls.ADMIN_MY_BRANCH_SWIPER
    // });
    wx.navigateBack({
      delta: 1
    });
  }

  private cleanSelectedProduct() {
    this.productIndex = -1;
    this.selectedProduct = '';
  }

  private init() {
    wx.setNavigationBarTitle({
      title: store.state.type === SwiperType.Home ? '首页轮播' : '附近轮播'
    });

    this.vm = {
      name: this.item.name,
      imageUrl: this.item.imageUrl,
      beginDate: this.getDateTime(this.item.beginTime, 'date'),
      beginTime: this.getDateTime(this.item.beginTime, 'time'),
      endDate: this.getDateTime(this.item.endTime, 'date'),
      endTime: this.getDateTime(this.item.endTime, 'time'),
      office: this.item.office,
      productId: this.item.productId,
      type: this.item.type,
      index: this.item.index
    };
  }

  private resetVm() {
    return {
      name: '',
      imageUrl: '',
      beginDate: '',
      beginTime: '',
      endDate: '',
      endTime: '',
      office: '',
      productId: -1,
      type: SwiperType.Home,
      index: 0
    };
  }

  private convertToEntity() {
    const { name, imageUrl, office, productId, type, index } = this.vm;

    return {
      name,
      imageUrl,
      office,
      productId,
      type,
      index,
      beginTime: this.getDateStamp(this.vm.beginDate, this.vm.beginTime),
      endTime: this.getDateStamp(this.vm.endDate, this.vm.endTime)
    };
  }
}

export default SwiperForm;
