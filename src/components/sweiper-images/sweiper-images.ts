import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppUrls, EmptyImagePlaceholder } from '@/utils/consts';
import { SwiperType } from '@/models/enums';
import { getImageUrl, handleError } from '@/utils';
import service from '@/api/service/client';

@Component
class SweiperImages extends Vue {
  @Prop({ default: SwiperType.Home }) type: SwiperType;

  swiperList = [];

  imgUrls = [EmptyImagePlaceholder];

  onLoad() {
    this.init().catch(handleError);
  }

  mounted() {
    console.log('swiper mouted');
  }

  onClick(index) {
    const length = this.swiperList.length;
    if (length > 0 && index < length) {
      const selected = this.swiperList[index];
      // console.log(selected)

      if (selected['productTitle'] && selected['productId']) {
        // 产品
        wx.navigateTo({
          url: `${AppUrls.CLIENT_COMMON_PRODUCT_DETAIL}?productId=${
            selected['productId']
          }`
        });
      } else {
        // 网点
        wx.navigateTo({
          url: `${AppUrls.COMMON_BANK_INFO}?userId=${selected['officeUserId']}`
        });
      }
    }
  }

  private async init() {
    const list = await service.getClientSwiper(this.type);

    if (list && list.length > 0) {
      this.imgUrls = list.map(item => getImageUrl(item.imageUrl));
      this.swiperList = list;
    }
  }
}

export default SweiperImages;
