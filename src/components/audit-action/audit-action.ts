import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AuditState } from '@/models/enums';

const debug = require('@/utils/debug')('log:components/audit-action');

@Component
class AuditAction extends Vue {
  current = '';
  desc = '';
  audit = [
    {
      value: AuditState.Approved,
      text: '通过'
    },
    {
      value: AuditState.Rejected,
      text: '不通过'
    }
  ];

  get isReject() {
    return this.current === '不通过';
  }

  get disabled() {
    if (this.isReject) {
      return !this.desc;
    }

    return this.current === '';
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  onUnload() {
    debug('onUnload');
    this.current = '';
    this.desc = '';
  }

  onAuditChange(e) {
    this.current = e.target.value;
  }

  onSave() {
    const index = this.audit.findIndex(x => x.text === this.current);
    const auditInfo = {
      status: this.audit[index].value,
      opDesc: this.isReject ? this.desc : ''
    };

    this.$emit('save', auditInfo);
  }
}

export default AuditAction;
