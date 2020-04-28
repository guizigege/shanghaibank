import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import { getImageUrl, timeAgo } from '@/utils';

@Component
class CardCommentInfo extends Vue {
  @Prop({ default: { amount: 0, rows: [], subAmount: 0 } }) comment;
  AppUrls = AppUrls;

  onLoad() {
    this.comment = this.comment.rows.map(c => {
      c.realIcon = getImageUrl(c.icon);
      c.releaseTime = timeAgo(c.createTime);
    });
  }

  @Emit('click')
  onLookMore() {
    return 'click';
  }
}

export default CardCommentInfo;
