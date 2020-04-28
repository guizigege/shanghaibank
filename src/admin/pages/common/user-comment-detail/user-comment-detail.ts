import { Vue, Component } from 'vue-property-decorator';
import AdminCommentList from '@/components/admin-comment-list/admin-comment-list';
import service from '@/api/service/client';
import { getImageUrl, handleError, timeAgo } from '@/utils';
import storage from '@/utils/storage';
import Empty from '@/components/empty/empty';
import { AppUrls } from '@/utils/consts';

@Component({
  components: {
    AdminCommentList,
    Empty
  }
})
class UserCommentDetail extends Vue {
  productId = '';
  isLoaded = false;
  focus: boolean = false;
  commentText: string = '';
  amount: number = 0;
  subAmount: number = 0;
  loginInfo: any = storage.get('loginInfo');

  comments: any[] = [];

  mounted() {
    wx.setNavigationBarTitle({ title: `客户评论` });
  }

  onLoad(options) {
    if (options && options.productId) {
      this.productId = options.productId;
      this.init({}).catch(handleError);
    }
  }

  async lower() {
    if (this.subAmount > 0) {
      const last = this.comments[this.comments.length - 1];
      await this.init({ createTime: last.createTime });
    }
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
    this.isLoaded = true;
    this.amount = data.amount;
    this.subAmount = data.subAmount;
    wx.setNavigationBarTitle({ title: `${this.amount}条客户评论` });
  }

  onUnload() {
    this.isLoaded = false;
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

  onLookDetail() {
    wx.navigateTo({
      url: AppUrls.ADMIN_MY_COMMENTS_DETAIL
    });
  }
}

export default UserCommentDetail;
