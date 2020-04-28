import { SignUpType, AuditType } from '@/models/enums';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import service from '@/api/service/admin';
import CardBankInfo from '@/components/card-bank-info/card-bank-info';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import CardManagerInfo from '@/components/card-manager-info/card-manager-info';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import store from '../store';
import AuditAction from '@/components/audit-action/audit-action';
import DetailProduct from '@/components/detail-product/detail-product';
import DetailManager from '@/components/detail-manager/detail-manager';
import DetailRed from '@/components/detail-red/detail-red';

@Component({
  components: {
    // CardPromotionInfo,
    // CardSuperiorInfo,
    DetailProduct,
    DetailManager,
    DetailRed,
    CardBankInfo,
    CardManagerInfo,
    AuditAction
  }
})
class AuditDetail extends Vue {
  AppUrls = AppUrls;

  auditType = AuditType;

  get item() {
    return store.state.item;
  }

  onShow() {
    // 小程序 hook
    console.log('audit detail', this.item);
    // debug('onShow');
  }

  async mounted() {
    // vue hook
    // debug('mounted');
  }

  async onSave(auditInfo) {
    const result = await store.dispatch('audit', auditInfo);
    if (result) {
      await store.dispatch('initAuditList');
      wx.switchTab({ url: AppUrls.ADMIN_TASK });
    }
  }
}

export default AuditDetail;
