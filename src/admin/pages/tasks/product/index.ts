import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import service from '@/api/service/admin';
import auth from '@/api/auth';
import SelectBank from '@/components/select/select';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';
import CardMiniSuperiorInfo from '@/components/card-mini-superior-info/card-mini-superior-info';
import { getImageUrl, handleError } from '@/utils';
import { isInterfaceDeclaration } from 'typescript';

const debug = require('@/utils/debug')('log:Admin/Tasks');

@Component({
  components: {
    SelectBank,
    CardMiniSuperiorInfo,
    Empty,
  }
})
class Index extends Vue {
  @Prop() current: string;

  AppUrls = AppUrls;
  loading: boolean = true;
  officeList = [];

  canSelectOffice = false;

  selectedOffice = '';

  loginInfo: any = {};

  officeIndex: number = 0;
  currentOffice: any = {};
  isSelfOffice: any = true;

  orderList: any = {};
  subAmount: number = 0;

  canSelectBtn: boolean = false;

  btnList = ['我的产品', 'TA人产品'];
  activeClass = 0;

  onLoad() {
    this.operatorAuth();

    this.init().catch(handleError);
  }

  onShow() {
    // 小程序 hook
    debug('onShow');

    this.init().catch(handleError);
  }

  async mounted() {
    // vue hook
    debug('mounted');
  }

  onHide() {
    this.loginInfo = {};
    this.orderList = [];
    this.currentOffice = {};
    this.officeIndex = 0;
    this.officeList = [];
  }

  @Watch('current')
  onTabChange(e) {
    console.log('current changed :', e);
    this.init().catch(handleError);
  }

  onOfficeChanged(params: { office: string }) {
    this.selectedOffice = params.office;
  }

  async onSelectStatus(index) {
    this.activeClass = index;
    this.isSelfOffice = index === 0;
    await this.getOrderList(
      {
        isOther: index,
        office: this.loginInfo.office,
        branch: this.loginInfo.branch
      },
      'new'
    );
  }

  async getOrderList(data?, method?) {
    this.loading = true;
    const req = {
      length: 10,
      productType: Number(this.current),
      office: this.currentOffice.office,
      branch: this.currentOffice.branch
    };
    if (data) {
      Object.assign(req, data);
    }
    const res = await service.getOrderList(req);
    this.loading = false;
    if (method === 'new') {
      this.orderList = [];
      this.subAmount = 0;
    }
    this.subAmount = res.subAmount;
    const d = res.rows.map(c => {
      c.realImageUrl = getImageUrl(c.imageUrl);
      return c;
    });
    this.orderList = [...this.orderList, ...d];
    // console.log(this.orderList);
  }

  async pickOffice(e) {
    this.officeIndex = e ? Number(e.mp.detail.value) : 0;
    this.currentOffice = this.officeList[this.officeIndex];
    this.isSelfOffice =
      auth.isBranch ||
      (auth.isOffice && this.currentOffice.userId === this.loginInfo.userId);
    await this.getOrderList(0, 'new');
  }

  jumpDetail(e) {
    // console.log(e);
    if (this.isSelfOffice) {
      wx.navigateTo({
        url: `${AppUrls.ADMIN_TASK_ORDER_COLLECT_DETAIL}?title=${
          e.title
        }&productId=${e.productId}`
      });
    }
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.orderList[this.orderList.length - 1];
      await this.getOrderList({ createTime: last.createTime });
    }
  }

  async initOfficeList() {
    let res: any = {};
    if (auth.isBranch && this.current === 'audit') {
      res = await service.bankList();
      res.rows = res.map(c => {
        return { office: c };
      });
    } else {
      res = await service.getCommonOfficeList();
    }
    this.officeList = res.rows;
    this.currentOffice = this.officeList[this.officeIndex];
  }

  operatorAuth() {
    this.canSelectOffice =
      auth.isBranch ||
      (auth.isOffice && ['1', '2'].some(x => x === this.current));
    this.canSelectBtn =
      auth.isManager && ['1', '2'].some(x => x === this.current);
  }

  private async init() {
    this.loginInfo = storage.get('loginInfo');

    this.operatorAuth();
    if (auth.isManager) {
      await this.onSelectStatus(0);
    } else {
      await this.initOfficeList();
      await this.pickOffice(null);
    }
  }
}

export default Index;
