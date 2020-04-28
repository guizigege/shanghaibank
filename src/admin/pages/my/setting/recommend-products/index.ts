import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts';
import { required } from 'vuelidate/lib/validators';
import store from './store';

const validations = {
  recommend: { required },
  productId: { required }
};

@Component({
  components: {},
  validations
})
class Index extends Vue {
  AppUrls = AppUrls;

  recommend: string = '';
  recommendProducts: any[] = [];
  content: string = '';
  productId: string = '';
  count: number = 0;

  async submitInfo() {
    if (!this.$v.$invalid) {
      await store.dispatch('saveInfo', { productId: this.productId, recommend: this.recommend });
    }
  }

  bindPickerChange(e) {
    const index = Number(e.mp.detail.value);
    this.content = this.recommendProducts[index].title;
    this.productId = this.recommendProducts[index].productId;
  }

  inputEvent(e) {
    this.recommend = e.mp.detail.value;
    this.count = this.recommend.length;
  }

  async onShow() {
    store.commit('getLoginInfo');
    const { extendInfo } = store.state.loginInfo;
    const {
      recommend, productId
    } = JSON.parse(extendInfo).userInfo;
    this.recommend = recommend;
    this.productId = productId;
    this.count = recommend ? recommend.length : 0;

    await store.dispatch('getRecommendProducts');
    this.recommendProducts = store.state.products;
    if (productId) {
      this.recommendProducts.forEach((c) => {
        if (c.productId === this.productId) {
          this.content = c.title;
        }
      });
    } else {
      this.content = this.recommendProducts[0].title;
      this.productId = this.recommendProducts[0].productId;
    }
  }

  onLoad() {
    wx.setNavigationBarTitle({ title: '推荐产品' });
  }

  onUnload() {
    store.commit('clearLoginInfo');
  }
}

export default Index;
