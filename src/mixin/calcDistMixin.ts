import QQMap from '@/utils/qqmap';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CalcDistanceMixin extends Vue {
  async calcDistance(location) {
    if (location) {
      const l = typeof location === 'string' ? JSON.parse(location) : location;
      return QQMap.calculateDistance('', [
        {
          latitude: l.latitude,
          longitude: l.longitude
        }
      ]);
    }
  }
}
