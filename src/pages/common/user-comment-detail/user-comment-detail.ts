import { Vue, Component } from 'vue-property-decorator';
import UserCommentList from '@/components/user-comment-list/user-comment-list';
import service from '@/api/service/client';
import { getImageUrl, handleError, timeAgo } from '@/utils';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';
import { AppUrls } from '@/utils/consts';

@Component({
  components: {
    UserCommentList,
    Empty
  }
})
class UserCommentDetail extends Vue {
  productId = '';
  isLoad = false;
  focus: boolean = false;
  commentText: string = '';
  amount: number = 0;
  subAmount: number = 0;
  loginInfo: any = {};
  comments: any[] = [];

  onLoad(options) {
    wx.setNavigationBarTitle({ title: `客户评论` });
    this.loginInfo = storage.get('loginInfo');
    if (options && options.productId) {
      this.productId = options.productId;
      this.init({}).catch(handleError);
    }
  }

  async onSend() {
    if (this.commentText === '') {
      return;
    }
    const params = {
      productId: this.productId,
      content: this.commentText
    };
    const res = await service.newComments(params).catch(handleError);
    if (res) {
      this.commentText = '';
      this.amount++;
      res.realIcon = getImageUrl(this.loginInfo.icon);
      res.userName = this.loginInfo.userName;
      res.releaseTime = timeAgo(res.createTime);
      this.comments.unshift(res);
      wx.setNavigationBarTitle({ title: `${this.amount}条客户评论` });
    }
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.comments[this.comments.length - 1];
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

  async init(param) {
    const req = Object.assign({ productId: this.productId }, param);
    const data = await service.productComments(req);
    const ar = data.rows.map(c => {
      c.realIcon = getImageUrl(c.icon);
      c.releaseTime = timeAgo(c.createTime);
      c.hasReply = 'replyCount' in c;
      return c;
    });
    this.comments = [...this.comments, ...ar];
    this.isLoad = true;
    this.amount = data.amount;
    this.subAmount = data.subAmount;
    wx.setNavigationBarTitle({ title: `${this.amount}条客户评论` });
  }

  onUnload() {
    this.isLoad = false;
    this.productId = '';
    this.focus = false;
    this.commentText = '';
    this.amount = 0;
    this.comments = [];
    this.loginInfo = {};
  }

  jumpUserInfo(e) {
    if (e.userId !== this.loginInfo.userId) {
      wx.navigateTo({
        url: `${AppUrls.COMMON_USER_INFO}?userId=${e.userId}`
      });
    }
  }
}

export default UserCommentDetail;
