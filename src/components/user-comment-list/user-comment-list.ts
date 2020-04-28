import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import auth from '@/api/auth';
import { AuditCommentState } from '@/models/enums';
import storage from '@/utils/storage';

@Component
class UserCommentList extends Vue {
  @Prop({ default: [] }) comments: any;
  AppUrls = AppUrls;
  isAdminApp: boolean = auth.isAdminApp;
  auditState = AuditCommentState;

  onShow() {
    // console.log('comments list show', this.comments);
  }

  onLoad() {
    // console.log('comments list load', this.comments);
  }

  @Emit('check')
  checkComment(i, s) {
    if ((s === 'pass' && this.comments[i]['status'] === this.auditState.Approved) || (s === 'reject' && this.comments[i]['status'] === this.auditState.Rejected)) {
      this.comments[i]['status'] = 1;
      return Object.assign(this.checkType(this.comments[i]), { status: 1 });
    }
    if (s === 'pass') {
      this.comments[i]['status'] = this.auditState.Approved;
      return Object.assign(this.checkType(this.comments[i]), { status: this.auditState.Approved });
    }
    if (s === 'reject') {
      this.comments[i]['status'] = this.auditState.Rejected;
      return Object.assign(this.checkType(this.comments[i]), { status: this.auditState.Rejected });
    }
  }

  checkType(data) {
    if ('commentId' in data) {
      return { commentId: data['commentId'], type: 'comment' };
    }
    if ('commentRevertId' in data) {
      return { commentRevertId: data['commentRevertId'], type: 'reply' };
    }
  }

  onLookReplay(i) {
    storage.set('commentDetail', this.comments[i]);
    wx.navigateTo({
      url: AppUrls.CLIENT_COMMON_USER_REPLAY_DETAIL
    });
  }

  @Emit('info')
  clickIcon(i) {
    return this.comments[i];
  }
}

export default UserCommentList;
