import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';

const debug = require('@/utils/debug')('log:Admin/AuditResult');

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  type = '';

  rejectReason = '';

  onShow(e) {
    // 小程序 hook
    debug('onShow');
  }

  onHide() {
    wx.redirectTo({ url: AppUrls.ADMIN });
  }

  onLoad(query) {
    debug('onLoad');
    this.type = query && query.type ? query.type : '';
    this.rejectReason = query && query.rejectReason ? query.rejectReason : '';
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  onEdit() {
    wx.redirectTo({
      url: `${AppUrls.SIGN_UP}?type=edit`
    });
  }
}

export default Index;
