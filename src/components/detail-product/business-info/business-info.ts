import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { emptyProductDetail, Gift, ProductDetail } from '@/models/product';
import { deepClone, getImageUrl } from '@/utils/index';
import { EmptyImagePlaceholder, strSeparator } from '@/utils/consts';
import auth from '@/api/auth';
import storage from '@/utils/storage';

@Component
class BusinessInfo extends Vue {
  @Prop() gifts: Array<Gift>;
  @Prop({ default: emptyProductDetail }) detail: ProductDetail;

  emptyGift = { name: '', desc: '', imageUrl: EmptyImagePlaceholder };

  group: Gift = { type: 'group', ...this.emptyGift };

  person: Gift = { type: 'person', ...this.emptyGift };

  groupImageUrls: Array<string> = [];

  personImageUrls: Array<string> = [];

  hasRedPage: boolean = false;

  timeBack: number = 10;
  time: any = {};
  timeShow: boolean = true;

  canReceive = true;

  loginInfo: any = {};

  isLoad = false;

  mounted() {
    //
  }

  checkRed() {
    this.detail.red.forEach(c => {
      c.hasGedRed = false;
      c.selfInfo = {};
      c.log.forEach(l => {
        if (l.userId === this.loginInfo.userId) {
          c.hasGedRed = true;
          c.selfInfo = l;
        }
      });
    });
  }

  onLoad() {
    this.init();
  }

  onUnload() {
    this.group = { ...this.group, ...this.emptyGift };
    this.person = { ...this.person, ...this.emptyGift };
    this.personImageUrls = [];
    this.groupImageUrls = [];
    clearInterval(this.time);
    this.timeShow = true;
    this.isLoad = false;
  }

  emitRedIndex(i) {
    // console.log('emitRedIndex', this.detail.red[i].hasGedRed);
    if (this.detail.red[i].hasGedRed) {
      return;
    } else {
      this.$emit('openRed', this.detail.red[i].packetId);
    }
  }

  onPreview(e, type) {
    wx.previewImage({
      current: e,
      urls: type === 'group' ? this.groupImageUrls : this.personImageUrls
    });
  }

  giftsChanged() {
    console.log('gifts', this.gifts);
    if (this.gifts && this.gifts.length > 0) {
      this.group = this.initGift('group');
      this.person = this.initGift('person');
    }
    this.$nextTick(() => {
      this.isLoad = true;
    });
  }

  initGift(type: 'group' | 'person') {
    const gift = deepClone(this.gifts.find(x => x.type === type) as Gift);
    // console.log('deepclone', gift);
    if (gift && gift.imageUrl) {
      const images = gift.imageUrl
        .split(strSeparator)
        .map(item => getImageUrl(`${item}`));

      if (type === 'group') {
        this.groupImageUrls = images;
      } else {
        this.personImageUrls = images;
      }
    }

    return gift;
  }

  private init() {
    this.loginInfo = storage.get('loginInfo');
    this.giftsChanged();
    // console.log(this.detail);
    // 是否有红包
    if (this.detail.red.length > 0) {
      const userId = auth.loginInfo.userId;
      this.hasRedPage = true;
      this.canReceive = this.detail.red.reduce((prev, curr) => {
        return prev && curr.log.every(x => x.userId !== userId);
      }, true);
    }
    if (this.hasRedPage === false) {
      this.timeShow = false;
    } else {
      this.checkRed();
      this.time = setInterval(() => {
        if (this.timeBack <= 0) {
          this.timeShow = false;
          clearInterval(this.time);
        } else {
          --this.timeBack;
        }
      }, 1000);
    }
  }
}

export default BusinessInfo;
