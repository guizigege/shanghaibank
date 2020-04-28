import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component
class Index extends Vue {
  @Prop() title: string;
  @Prop() placeholder: string;
  @Prop({ default: false }) sign: boolean;
  @Prop({ default: true }) showTip: boolean;
  @Prop() type: string;
  @Prop() desc: string;
  @Prop() tip: string;
  @Prop() value: any;
  @Prop() maxLength: number;
  @Prop( { default: true }) arrow: boolean;
  get noSelect(): boolean {
    return /[选|计算]/.test(this.desc);
  }
  @Emit('click') onClick() {
    //
  }
  @Emit('input') inputVal(e) {
    //
  }
  @Emit('blur') blur() {
    //
  }

}
export default Index;
