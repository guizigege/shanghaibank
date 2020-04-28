import { Vue, Component, Prop } from 'vue-property-decorator';
import { EmptyManage, Manager } from '@/models/manager';
@Component
class PersonalView extends Vue {
  @Prop() manager: Manager;
  mounted() {
    // vue hook
  }

  onUnload() {
    this.manager = EmptyManage;
  }
}

export default PersonalView;
