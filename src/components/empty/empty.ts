import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
class Empty extends Vue {
  @Prop({ default: true }) loading: boolean;
  @Prop({ default: '暂无数据' }) tip: string;
  @Prop() list: any[];
  @Prop({ default: false }) isEmpty: boolean;
}

export default Empty;
