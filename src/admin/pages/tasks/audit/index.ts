import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import CardBankInfo from '@/components/card-bank-info/card-bank-info';
import CardSuperiorInfo from '@/components/card-superior-info/card-superior-info';
import CardManagerInfo from '@/components/card-manager-info/card-manager-info';
import CardPromotionInfo from '@/components/card-promotion-info/card-promotion-info';
import UserCommentList from '@/components/user-comment-list/user-comment-list';
import CardRedPacketInfo from '@/components/card-red-packet-info/card-red-packet-info';
import Empty from '@/components/empty/empty';
import store from './store';
import { AuditData } from '@/models/bank';
import auth from '@/api/auth';

@Component({
  components: {
    CardPromotionInfo,
    CardSuperiorInfo,
    CardBankInfo,
    CardManagerInfo,
    CardRedPacketInfo,
    Empty,
    UserCommentList
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  isLoad: boolean = false;
  commentList: any = [];
  revertList: any = [];

  @Prop({ default: '' }) selectedOffice: string;

  @Watch('selectedOffice')
  async selectedOfficeChanged(value) {
    console.log('selectedOfficeChanged :', value);
    this.reset();
    store.commit('setSelectedOffice', value);
    await store.dispatch('initAuditList');
    this.isLoad = true;
  }
  get loading() {
    return store.state.loading;
  }
  get isManager() {
    return auth.isManager;
  }
  get isBranch() {
    return auth.isBranch;
  }
  get office() {
    return store.state.list.office;
  }

  get manager() {
    return store.state.list.manager;
  }

  get superior() {
    return store.state.list.superior;
  }

  get promotion() {
    return store.state.list.promotion;
  }

  get redPacket() {
    return store.state.list.redPacket;
  }

  get comments() {
    return store.state.list.comments;
  }

  get commentSubAmount() {
    return store.state.comments.subAmount;
  }

  get isEmptyTask() {
    return (
      this.office.length === 0 &&
      this.manager.length === 0 &&
      this.superior.length === 0 &&
      this.promotion.length === 0 &&
      this.comments.length === 0
    );
  }
  async lower() {
    if (this.commentSubAmount > 0) {
      const last: any = this.comments[this.comments.length - 1];
      await store.dispatch('moreComments', { createTime: last.createTime });
    }
  }

  async onLoad() {
    store.commit('initOffice', this.selectedOffice);
    await this.init();
    this.isLoad = true;
  }

  async onShow() {
    store.commit('initOffice', this.selectedOffice);
    await this.init();
    this.isLoad = true;
  }

  async onSelected(item: AuditData) {
    store
      .dispatch('initAuditItem', item)
      .then(() => {
        // console.log('audit store comment after', store.state.item);
        wx.navigateTo({ url: AppUrls.ADMIN_TASK_AUDIT_DETAIL });
      })
      .catch();
  }

  async checkComment(e) {
    if (e.type === 'comment') {
      const c = this.commentList.filter(c => c.commentId !== e.commentId);
      c.push(e);
      this.commentList = c.filter(c => c.status !== 1);
    }
    if (e.type === 'reply') {
      const r = this.revertList.filter(
        c => c.commentRevertId !== e.commentRevertId
      );
      r.push(e);
      this.revertList = r.filter(c => c.status !== 1);
    }
    // console.log(this.commentList, this.revertList);
  }

  onUnload() {
    this.isLoad = false;
    this.reset();
    // console.log('audit unload');
  }

  async onHide() {
    this.isLoad = false;
    // store.commit('clean');
    // console.log('audit hide');
    if (this.commentList.length > 0 || this.revertList.length > 0) {
      await store.dispatch('checkComment', {
        commentList: this.commentList,
        revertList: this.revertList
      });
    }
  }

  private async init() {
    await store.dispatch('initAuditList');
    this.isLoad = true;
  }

  private reset() {
    store.commit('clean');
  }
}

export default Index;
