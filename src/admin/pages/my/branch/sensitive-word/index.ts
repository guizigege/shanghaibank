import { Vue, Component } from 'vue-property-decorator';
import { AppUrls, WebViewUploadURL } from '@/utils/consts.ts';

@Component({
  components: {}
})
class Index extends Vue {
  AppUrls = AppUrls;

  webViewUploadURL = WebViewUploadURL;

  onLoad() {
    wx.setNavigationBarTitle({ title: '敏感词' });
  }
}

export default Index;
