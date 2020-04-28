import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { debounce } from '@/utils';

@Component
class SearchBar extends Vue {
  @Prop({ default: '' })
  // @Prop() placeholder: string;
  placeholder: string;

  value = '';

  showed = false;

  onInput = debounce(e => {
    this.value = e.mp.detail.value;
    this.change();
  });

  mounted() {
    // vue hook
  }

  @Emit()
  change() {
    return this.value.split('').join('%');
  }

  @Emit()
  reset() {
    return this.value;
  }

  onClickSearch() {
    this.showed = true;
  }

  onClear() {
    this.value = '';
    this.reset();
  }
}

export default SearchBar;
