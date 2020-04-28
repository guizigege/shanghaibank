import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import AuditList from './audit';
import Product from './product/index';
import service from '@/api/service/admin';
import auth from '@/api/auth';
import SelectBank from '@/components/select/select';
import { handleError } from '@/utils';

const debug = require('@/utils/debug')('log:Admin/Tasks');

@Component({
  components: {
    SelectBank,
    AuditList,
    Product
  }
})
class Index extends Vue {
  AppUrls = AppUrls;

  current = 'audit';

  officeList = [];

  canSelectOffice = false;

  selectedOffice = '';

  async onLoad() {
    wx.showToast({
      title: '页面加载中...',
      icon: 'loading'
    });
    await this.init().catch(handleError);
  }

  async onShow() {
    // 小程序 hook
    debug('onShow');
    await this.init().catch(handleError);
  }

  async mounted() {
    // vue
    wx.hideToast();
    debug('mounted');
  }

  onTabChange(e) {
    this.current = e.mp.detail.key;
    this.operatorAuth();
  }

  onOfficeChanged(params: { office: string }) {
    this.selectedOffice = params.office;
  }

  private async initOfficeList() {
    if (this.officeList.length === 0) {
      const arr = await service.bankList();
      this.officeList = arr.map(item => ({ office: item }));
    }
  }

  private operatorAuth() {
    this.canSelectOffice = this.current === 'audit' && auth.isBranch;
  }

  private async init() {
    this.operatorAuth();
    if (auth.isManager === false) {
      await this.initOfficeList();
    }
  }
}

export default Index;
