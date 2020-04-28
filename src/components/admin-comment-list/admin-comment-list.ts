import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Comment } from '@/models/comment';
import { AppUrls } from '@/utils/consts.ts';
import { AuditCommentState } from '@/models/enums';
import storage from '@/utils/storage';

@Component
class AdminCommentList extends Vue {
  @Prop({ default: [] }) comments: Array<Comment>;
  AppUrls = AppUrls;
  auditState = AuditCommentState;

  onShow() {
    // console.log('comments list show', this.comments);
  }

  onLoad() {
    // console.log('comments list load', this.comments);
  }

  @Emit('reply')
  onLookDetail(i) {
    storage.set('commentDetail', this.comments[i]);
  }

  @Emit('info')
  clickIcon(i) {
    return this.comments[i];
  }
}

export default AdminCommentList;
