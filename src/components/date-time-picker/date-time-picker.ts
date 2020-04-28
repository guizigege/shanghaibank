import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {}
})
class DateTimePicker extends Vue {
  @Prop({ default: 'date' }) mode: 'date' | 'time';

  @Prop() start: string;

  @Prop() end: string;

  @Prop(String) value;

  get placeholder() {
    return this.mode === 'date' ? 'yyyy-MM-dd' : 'hh:mm';
  }

  onShow() {
    // 小程序 hook
  }

  mounted() {
    // vue hook
  }

  @Emit()
  change() {
    return this.value;
  }

  onChange(e) {
    this.value = e.mp.detail.value;
    this.change();
  }

  onCancel() {
    this.$emit('cancel');
  }
}

export default DateTimePicker;
