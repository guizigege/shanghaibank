import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { BankInfo, AuditData } from '@/models/bank';
import { AuditType } from '@/models/enums';
import { timeAgo, getImageUrl, isValidJSON } from '@/utils';
import { DefaultBankLogo } from '@/utils/consts';

@Component
class CardBankInfo extends Vue {
  @Prop() bank: BankInfo;

  timeAgo = '';

  avatar = DefaultBankLogo;

  onLoad() {
    if (this.bank) {
      this.timeAgo = timeAgo(this.bank['submitTime']);
      this.avatar = getImageUrl(`${this.bank.avatar}`);
    }
  }

  mounted() {
    // vue hook
  }

  @Emit('click')
  navToAuditDetail(): AuditData {
    return { type: AuditType.Office, info: this.bank };
  }

  onClick() {
    this.navToAuditDetail();
  }
}

export default CardBankInfo;
