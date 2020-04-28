import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component
class Index extends Vue {
  @Prop() title: string;
  @Prop() placeholder: string;
  @Prop() desc: string;
  @Prop() id: any;
  @Prop() value: any;
  @Prop() maxLength: number;

  @Emit('input') input() {
    //
  }
  @Emit('blur') blur() {
    //
  }
}
export default Index;
