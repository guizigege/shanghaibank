import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import Contacts from '../contacts/contacts';
import { emptyOrderItem, OrderItem } from '@/models/product';
import { GroupType, OrderStatus } from '@/models/enums';

@Component({
  components: {
    Contacts
  }
})
class OrderSuperiorInfo extends Vue {
  @Prop({ default: emptyOrderItem }) info: OrderItem;
  orderStatus = OrderStatus;
  groupType = GroupType;

  onLoad() {
    // console.log(this.info);
  }

  @Emit('click')
  onClick() {
    return this.info;
  }
}

export default OrderSuperiorInfo;
