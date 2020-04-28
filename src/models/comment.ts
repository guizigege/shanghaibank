/** （优品/活动）评论 */

export interface Comment {
  /** 评论信息 */
  commentNum: Number;
  commentName: string;
  commentTime: string;
  commentContent: string;
  status: Number;
  count: Number;
}

export const defaultComment: Comment = {
  commentNum: 0,
  commentName: '',
  commentTime: '',
  commentContent: '',
  status: 0,
  count: 0
};

export interface CommentItem {
  commentId: number;
  icon: string;
  userName: string;
  content: string;
  createTime: number;
  replyCount: number;
  userId: string;
  productId: number;
  status: number;
}

export const defaultCommentItem: CommentItem = {
  commentId: 0,
  icon: '',
  userName: '',
  content: '',
  createTime: 0,
  replyCount: 0,
  userId: '',
  productId: 0,
  status: 0
};
