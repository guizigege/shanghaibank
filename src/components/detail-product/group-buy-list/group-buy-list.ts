import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { GroupList, GroupListItem } from '@/models/product';

@Component
class GroupBuyList extends Vue {
  @Prop() detail: GroupList;
  @Prop() list: GroupListItem;

  // 参团
  @Emit('toOrder')
  async onGoGroupBuy(i) {
    return [2, this.list[i].groupId, i];
  }
}

export default GroupBuyList;
