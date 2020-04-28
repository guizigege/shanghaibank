import { Vue, Component } from 'vue-property-decorator';
import storage from '@/utils/storage';
import service from '@/api/service/client';
import { getImageUrl, handleError, timeAgo } from '@/utils';
import Empty from '@/components/empty/empty';
import UserCommentList from '@/components/user-comment-list/user-comment-list';

@Component({
  components: {
    Empty,
    UserCommentList
  }
})
class UserReplayDetail extends Vue {
  comment: any = {};
  focus: boolean = false;
  commentText: string = '';
  reply: any = [];
  isLoad: boolean = false;
  amount: number = 0;
  subAmount: number = 0;
  loginInfo: any = {};

  async onLoad() {
    wx.setNavigationBarTitle({ title: `回复` });
    this.loginInfo = storage.get('loginInfo');
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
    this.loginInfo = {};
    storage.remove('commentDetail');
  }

  async onSend() {
    if (this.commentText === '') {
      return;
    }
    const params = {
      commentId: this.comment.commentId,
      content: this.commentText
    };
    const res = await service.newReply(params).catch(handleError);
    if (res) {
      this.commentText = '';
      this.amount++;
      res.realIcon = getImageUrl(this.loginInfo.icon);
      res.releaseTime = timeAgo(res.createTime);
      res.userName = this.loginInfo.userName;
      this.reply.unshift(res);
      wx.setNavigationBarTitle({ title: `${this.amount}条回复` });
    }
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.reply[this.reply.length - 1];
      await this.init({ createTime: last.createTime });
    }
  }

  focusEvent() {
    this.focus = true;
  }

  blurEvent() {
    this.focus = false;
  }

  inputMsg(e) {
    this.commentText = e.mp.detail.value;
  }
}

export default UserReplayDetail;
