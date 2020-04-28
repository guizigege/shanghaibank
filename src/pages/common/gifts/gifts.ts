import { Vue, Component } from 'vue-property-decorator';
import { Gift, emptyGift } from '@/models/product';
import { handleError, isValidJSON, getImageUrl } from '@/utils';
import { strSeparator } from '@/utils/consts';
import service from '@/api/service/client';

const debug = require('@/utils/debug')('log:Common/Gifts');

@Component({
  components: {
    //
  }
})
class Index extends Vue {
  gift: Gift = emptyGift;

  isGroup = true;

  isLoaded = false;

  imageUrls: Array<string> = [];

  tip: string = '';

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '好礼大派送' });

    if (options && options.productId) {
      this.init(options.productId).catch(handleError);
    }
  }

  onUnload() {
    this.gift = emptyGift;
    this.isLoaded = false;
  }

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  onPreview(e) {
    wx.previewImage({
      current: e,
      urls: this.imageUrls
    });
  }

  async init(productId) {
    try {
      const res = await service.scanQR({ productId });
      console.log(res);
      this.isGroup = res.type === 2;
      try {
        const d = JSON.parse(res.giftInfo).filter(c => {
          if (res.type === 2) {
            return c.type === 'group';
          } else {
            return c.type === 'person';
          }
        });
        this.gift = d[0];
        if (this.gift.imageUrl) {
          this.imageUrls = this.gift.imageUrl.split(strSeparator).map(item => getImageUrl(`${item}`));
        }
        if (this.gift.name === '' && this.gift.desc === '' && this.gift.imageUrl === '') {
          this.tip = '无法获取礼品信息！';
        } else {
          this.tip = '赶紧去网点领取吧！去晚了就没啦！';
        }
      } catch (e) {
        this.tip = '无法获取礼品信息！';
      }
      this.isLoaded = true;
    } catch (e) {
      this.tip = '您还没有参加活动';
    }
  }
}

export default Index;
