import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import store from './store'

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;
  get myCash() {
    return store.state.money;
  }
  toWithdraw() {
    wx.navigateTo({
      url: this.AppUrls.CLIENT_MY_PURSE_WITH_DRAW
    });
  }
  onShow() {
    store.dispatch('money').catch(err => console.log(err))
  }
}

export default Index;
