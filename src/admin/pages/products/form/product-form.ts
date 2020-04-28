import { Component, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { AppUrls } from '@/utils/consts';
import { Product, Gift, emptyGift } from '@/models/product';
import { ProductType } from '@/models/enums';
import {
  required,
  minLength,
  minValue,
  maxLength
} from 'vuelidate/lib/validators';
import { isValidJSON, handleError } from '@/utils';
import EnumValues from '@/utils/enum-values';
import store from '../store';
import DateTimePicker from '@/components/date-time-picker/date-time-picker';
import Uploader from '@/components/uploader/uploader';
import FormMixin from '@/utils/form-mixins';
import { $Toast } from 'static/iview/base';

const validations = {
  vm: {
    title: { required, minLength: minLength(2), maxLength: maxLength(20) },
    content: { required },
    address: {},
    imageUrl: { required },
    linkUrl: { required },
    // otherUrl: { required },
    beginDate: {},
    beginTime: {},
    endDate: {},
    endTime: { required },
    managerUserId: { required },
    groupSum: { required, minValue: minValue(1) },
    groupTime: { required, minValue: minValue(1) },
    personalGift: {
      name: { maxLength: maxLength(10) },
      desc: { maxLength: maxLength(200) }
    },
    groupGift: {
      name: { maxLength: maxLength(10) },
      desc: { maxLength: maxLength(200) }
    }
  }
};

@Component({
  components: { DateTimePicker, Uploader },
  validations
})
class ProductForm extends mixins(FormMixin) {
  AppUrls = AppUrls;

  index = 0;

  selectedManager = '';

  get productTypeName() {
    return EnumValues.getNameFromValue(ProductType, this.product.productType);
  }

  get product(): Product {
    return store.state.form.product;
  }

  get managerList() {
    return store.state.form.managers;
  }

  get validator() {
    return this.$v.vm;
  }

  vm = this.resetVm();

  @Watch('vm', { immediate: true, deep: true })
  onVmChanged(val) {
    if (this.isLoaded) {
      store.commit('setValidProduct', {
        product: this.convertToProduct()
      });

      if (this.$v.$invalid) {
        store.commit('setFormError');
      }
    }
  }

  onShow() {
    this.init();
  }

  onLoad() {
    this.init();
  }

  onUnload() {
    this.vm = this.resetVm();
    this.isLoaded = false;
    this.$v.$reset();
  }

  mounted() {
    store
      .dispatch('initManagers')
      .then(() => {
        if (this.managerList.length === 0) {
          $Toast({
            content: '没有客户经理',
            type: 'warning'
          });
          return;
        }
        const idx = this.managerList.findIndex(
          x => x['userId'] === this.vm.managerUserId
        );
        this.index = ~idx ? idx : 0;
        this.onManagerChange();
      })
      .catch(handleError);
  }

  onManagerChange(e?) {
    if (this.managerList.length === 0) {
      return;
    }

    this.index = e ? +e.mp.detail.value : this.index;
    this.vm.managerUserId = this.managerList[this.index]['userId'];
    this.selectedManager = this.managerList[this.index]['manager'];
  }

  onUploadGift(url, type) {
    this.vm[type].imageUrl = this.addUrl(this.vm[type].imageUrl, url);
  }

  onRemoveGift(url, type) {
    this.vm[type].imageUrl = this.removeUrl(this.vm[type].imageUrl, url);
  }

  onRemoveOtherUrl(index) {
    this.vm.otherUrl = this.removeUrl(this.vm.otherUrl, index);
  }

  onUploadOtherUrl(url) {
    this.vm.otherUrl = this.addUrl(this.vm.otherUrl, url);
  }

  private gift(obj: string, type: 'person' | 'group'): Gift {
    let result = {
      ...emptyGift,
      type
    };

    if (isValidJSON(obj)) {
      const gifts = JSON.parse(obj);
      const gift = gifts.find(x => x.type === type);

      result = gift ? gift : gift;
    }

    return result;
  }

  private init() {
    this.vm = {
      title: this.product.title,
      content: this.product.content,
      imageUrl: this.product.imageUrl,
      linkUrl: this.product.linkUrl as string,
      otherUrl: this.product.otherUrl as string,
      beginDate: this.getDateTime(this.product.beginTime, 'date'),
      beginTime: this.getDateTime(this.product.beginTime, 'time'),
      endDate: this.getDateTime(this.product.endTime, 'date'),
      endTime: this.getDateTime(this.product.endTime, 'time'),
      address: this.product.address,
      managerUserId: this.product.managerUserId as string,
      groupSum: this.product.groupSum || 0,
      groupTime: this.product.groupTime || 0,
      groupGift: this.gift(this.product.giftInfo as string, 'group'),
      personalGift: this.gift(this.product.giftInfo as string, 'person')
    };
    this.isLoaded = true;
    // console.log('init product form :', this.vm, this.product);
  }

  private convertToProduct(): Product {
    return {
      productId: this.product.productId,
      productType: this.product.productType,
      title: this.vm.title,
      content: this.vm.content,
      imageUrl: this.product.imageUrl,
      linkUrl: this.product.linkUrl,
      otherUrl: this.vm.otherUrl,
      beginTime: this.getDateStamp(this.vm.beginDate, this.vm.beginTime),
      endTime: this.getDateStamp(this.vm.endDate, this.vm.endTime),
      address: this.vm.address,
      giftInfo: JSON.stringify([this.vm.personalGift, this.vm.groupGift]),
      managerUserId: this.vm.managerUserId,
      groupSum: this.vm.groupSum,
      groupTime: this.vm.groupTime,
      status: this.product.status,
      bankInfo: this.product.bankInfo,
      state: this.product.state,
      personLook: this.product.personLook,
      groupNum: this.product.groupNum,
      groupBuy: this.product.groupBuy
    };
  }

  private resetVm() {
    return {
      title: '',
      content: '',
      imageUrl: '',
      linkUrl: '',
      otherUrl: '',
      beginDate: '',
      beginTime: '',
      endDate: '',
      endTime: '',
      address: '',
      managerUserId: '',
      groupSum: 0,
      groupTime: 0,
      groupGift: this.gift('', 'group'),
      personalGift: this.gift('', 'person')
    };
  }
}

export default ProductForm;
