import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
class SelectBank extends Vue {
  @Prop({ default: [] }) list: any[];
  current: number = 0;
  selected: boolean = false;
  get office() {
    if (this.list.length > 0) {
      return this.list[this.current].office;
    } else {
      this.current = 0;
      return '当前没有网点';
    }
  }
  onReady() {
    if (this.list.length > 0) {
      this.currentChanged();
    }
  }
  onSelectBank(e) {
    let index = e.mp.detail.value;
    this.current = index;
    this.currentChanged();
    this.selected = false;
  }

  onShowSelect() {
    this.selected = !this.selected;
  }

  cancelSelect() {
    this.selected = false;
  }

  private currentChanged() {
    const index = this.current;
    const item = this.list[index];
    this.$emit('chooseBank', item);
  }
}

export default SelectBank;
