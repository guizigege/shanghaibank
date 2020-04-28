import { AppUrls } from '@/utils/consts.ts';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import qqmap from '@/utils/qqmap';
import { getCurrentPageData } from '@/utils';

@Component
class Location extends Vue {
  address = '深圳市';

  onLoad() {
    wx.getLocation({
      type: 'wgs84',
      success: async res => {
        const latitude = res.latitude;
        const longitude = res.longitude;

        const location = await qqmap.reverseGeocoder(latitude, longitude);

        this.address = location['result'].address_component.city;

        this.$emit('loadCurrentLocation', location['result']);
      }
    });
  }

  onShow() {
    const data = getCurrentPageData();

    if (data && data.district) {
      this.address = data.district;
      this.$emit('locationChanged', data);
    }
  }

  mounted() {
    //
  }

  onSelectLocation() {
    // wx.chooseLocation({
    //   success: res => {
    //     if (res['errMsg'] === 'chooseLocation:ok') {
    //       const { name, address, latitude, longitude } = { ...res };
    //       this.address = name;
    //       this.$emit('locationChanged', location);
    //     } else {
    //       handleError('网点定位失败');
    //     }
    //   }
    // });

    wx.navigateTo({ url: AppUrls.CLIENT_COMMON_MAP });
  }
}

export default Location;
