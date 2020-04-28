import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component
export default class Tip extends Vue {
  @Prop({ default:'默认的数据' }) tip: string;
  @Prop({ default:true }) showTip: boolean;
}

