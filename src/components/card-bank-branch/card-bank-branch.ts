import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import Contacts from '../contacts/contacts';
import { getImageUrl } from '@/utils';

@Component({
  components: { Contacts }
})
class CardBankBranch extends Vue {
  @Prop() bank: any;

  onLoad() {
    this.init();
  }

  onShow() {
    this.init();
  }

  init() {
    this.bank.realIcon = getImageUrl(this.bank.icon);
    // console.log(this.bank);
  }

  @Emit('click')
  onClick() {
    return this.bank;
  }
}

export default CardBankBranch;
