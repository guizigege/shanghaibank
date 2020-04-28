import { Vue, Component } from 'vue-property-decorator';
import storage from '@/utils/storage';

@Component({
  components: {}
})
class AuditDetail extends Vue {
  detail: any = {};

  onLoad() {
    wx.setNavigationBarTitle({ title: '查看帮助' });
  }

  onShow() {
    this.detail = storage.get('helpDetail');
  }

  onUnload() {
    storage.remove('helpDetail');
    this.detail = {};
  }
}

export default AuditDetail;
