import { Vue, Component } from 'vue-property-decorator';
import storage from '@/utils/storage';
import service from '@/api/service/client';
import { getImageUrl, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import AdminCommentList from '@/components/admin-comment-list/admin-comment-list';

@Component({
  components: {
    Empty,
    AdminCommentList
  }
})
class AdminReplayDetail extends Vue {
  comment: any = {};
  focus: boolean = false;
  commentText: string = '';
  reply: any = [];
  isLoad: boolean = false;
  amount: number = 0;
  subAmount: number = 0;

  async mounted() {
    wx.setNavigationBarTitle({ title: `回复` });
    this.comment = storage.get('commentDetail');
    await this.init({});
  }

  async init(param) {
    const req = Object.assign({ commentId: this.comment.commentId }, param);
    const data = await service.commentReplyList(req);
    const ar = data.rows.map(c => {
      c.realIcon = getImageUrl(c.icon);
      c.releaseTime = timeAgo(c.createTime);
      c.hasReply = false;
      return c;
    });
    this.reply = [...this.reply, ...ar];
    this.isLoad = true;
    this.amount = data.amount;
    this.subAmount = data.subAmount;
    wx.setNavigationBarTitle({ title: `${this.amount}条回复` });
  }

  onUnload() {
    this.comment = {};
    this.isLoad = false;
    this.focus = false;
    this.commentText = '';
    this.amount = 0;
    this.reply = [];
    storage.remove('commentDetail');
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.reply[this.reply.length - 1];
      await this.init({ createTime: last.createTime });
    }
  }
}

export default AdminReplayDetail;
