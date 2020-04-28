import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import { ProductAuditState } from '@/models/enums';
import EnumValues from '@/utils/enum-values';

@Component
class CardMiniSuperiorInfo extends Vue {
  @Prop() info;
  @Prop() isSelfOffice;

  get isReject() {
    let reject = false;

    if (this.info && this.info.status) {
      reject = +this.info.status === ProductAuditState.不通过;
    }

    return reject;
  }

  get status() {
    let status = '';

    if (this.info && this.info.status) {
      status = `${EnumValues.getNameFromValue(
        ProductAuditState,
        this.info.status
      )}`;
    }

    return status;
  }

  onLoad() {
    // console.log(this.info);
  }

  @Emit('click')
  onClick() {
    return this.info;
  }
}

export default CardMiniSuperiorInfo;
