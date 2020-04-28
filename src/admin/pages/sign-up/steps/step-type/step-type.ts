import { Vue, Component } from 'vue-property-decorator';
import { SignUpType } from '@/models/enums';
import store from '../../store';

@Component({
  components: {}
})
class StepType extends Vue {
  signUpType = Object.keys(SignUpType);
  types = [
    {
      id: 0,
      value: '客户经理'
    },
    {
      id: 1,
      value: '网点'
    }
  ];
  get current() {
    return store.state.signUpInfo.submitType;
  }

  onShow() {
    // 小程序 hook

  }
  onLoad() {

  }

  mounted() {
    // vue hook
    wx.setNavigationBarTitle({ title: '选择身份' });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#888888',
    });
  }


  onSignUpTypeChanged(e) {
    console.log(e.mp.detail.value);
    store.commit('onSignUpTypeChanged', e.target.value);
  }

  onNext() {
    store.commit('onNext');
  }
}

export default StepType;
