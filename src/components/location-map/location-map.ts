
import { Vue, Component } from 'vue-property-decorator';
import qqmap from '@/utils/qqmap';
import { getCurrentPageData,handleError } from '@/utils';

@Component
class LocationMap extends Vue {
  address = '深圳市';

  onLoad() {
    wx.getLocation({
      type: 'gcj02',
      success: async res => {
        const latitude = res.latitude;
        const longitude = res.longitude;

        const location = await qqmap.reverseGeocoder(latitude, longitude);
        console.log(location);
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
    wx.chooseLocation({
      success: res => {
        if (res['errMsg'] === 'chooseLocation:ok') {
          const { name, address, latitude, longitude } = { ...res };
          this.address = name || '请选择地点';
          this.$emit('locationChanged', { la: latitude,lo: longitude });
        } else {
          handleError('网点定位失败');
        }
      }
    });
  }
}

export default LocationMap;
