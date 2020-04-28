import { Vue, Component, Prop } from 'vue-property-decorator';
import { EmptyManage, Manager } from '@/models/manager';

@Component
class CareerHighlights extends Vue {
  @Prop() manager: Manager;
  mounted() {
    // vue hook
  }

  onUnload() {
    this.manager = EmptyManage;
  }
}

export default CareerHighlights;
