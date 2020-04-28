import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
class CardBusinessInfo extends Vue {
  @Prop() product: any;
  get sumMoney() {
    return this.product.sumMoney?this.product.sumMoney.toFixed(2):'0.00'
  }
  onLoad() {
    //
  }
}
export default CardBusinessInfo;
