import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardManagerInfo from '@/components/card-manager-info/card-manager-info';
import store from '../store';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';

@Component({
  components: {
    CardManagerInfo,
    Empty
  }
})
class MangerCompany extends Vue {
  AppUrls = AppUrls;

  isLoad: boolean = false;

  get manager() {
    return store.state.list.manager;
  }
  get loading() {
    return store.state.loading;
  }
  @Watch('manager')
  change() {
    this.isLoad = false;
    this.$nextTick(() => {
      this.isLoad = true;
    });
  }

  currentManager(index) {
    wx.navigateTo({
      url: `${AppUrls.CLIENT_MANAGERS_INFO}?userId=${this.manager[index].userId}`
    });
    storage.set('manageDetail', JSON.stringify(this.manager));
  }

  onBackPage() {
    // wx.navigateTo({
    //   url: '' // 页面 A
    // })
  }
}

export default MangerCompany;
