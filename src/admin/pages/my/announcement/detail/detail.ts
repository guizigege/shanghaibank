import { Vue, Component } from 'vue-property-decorator';
import storage from '@/utils/storage';

@Component({
  components: {}
})
class AuditDetail extends Vue {
  checkboxValues = [{ id: 1, value: '客户' }, { id: 2, value: '支行网点' }];
  detail: any = {};

  get currentCheckbox() {
    let current: String[] = [];
    if (this.detail.isClient === 1) {
      current.push('客户');
    }
    if (this.detail.isOffice === 1) {
      current.push('支行网点');
    }
    return current;
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '查看公告' });
  }

  onShow() {
    this.detail = storage.get('noticeDetail');
  }

  onUnload() {
    storage.remove('noticeDetail');
    this.detail = {};
  }
}

export default AuditDetail;
