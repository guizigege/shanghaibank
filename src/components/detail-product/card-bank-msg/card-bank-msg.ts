import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { emptyProductDetail, ProductDetail } from '@/models/product';
import auth from '@/api/auth';
import Contacts from '@/components/contacts/contacts';
import { DefaultBankLogo } from '@/utils/consts';
import { getImageUrl, isValidJSON } from '@/utils';

@Component({
  components: { Contacts }
})
class CardBankMsg extends Vue {
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  get isAdminApp() {
    return auth.isAdminApp;
  }

  avatar = DefaultBankLogo;

  location: any = {};

  onLoad() {
    if (this.detail && this.detail.product) {
      this.location = this.detail.product.location;
      if (
        this.detail.product.bankInfo &&
        isValidJSON(this.detail.product.bankInfo)
      ) {
        const bankInfo = JSON.parse(this.detail.product.bankInfo);
        this.avatar = bankInfo.avatar ? getImageUrl(bankInfo.avatar) : DefaultBankLogo;
      }
    }
  }

  mounted() {
    // vue hook
  }

  // 进网点看看
  @Emit('click')
  onEnterInter() {
    return this.detail.product.userId;
  }
}

export default CardBankMsg;
