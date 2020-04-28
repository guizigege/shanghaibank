import Vue from 'vue';
import Component from 'vue-class-component';
import { strSeparator } from './consts';
import { formatTime } from '@/utils/index';

@Component
export default class FormMixin extends Vue {

  isLoaded = false;

  onLoad() {
    this.isLoaded = true;
  }

  onUnload() {
    // this.vm = this.resetVm();
    this.isLoaded = false;
    // this.$v.$reset();
  }

  /**
   * 获取时间戳
   * @param date 日期
   * @param time 时间
   */
  protected getDateStamp(date: string, time: string) {
    // ios 中 new Date() 的日期字符串参数仅支持 yyyy/MM/dd 的格式
    const dateTime = `${date} ${time}`.replace(/\-/g, '\/');
    return date && time ? new Date(dateTime).getTime().toString() : '';
  }

  /**
   * 获取日期或时间
   * @param dateTime 时间字符串
   * @param type 获取类型 [date, time]
   */
  protected getDateTime(dateTime?: string, type: 'date' | 'time' = 'date') {
    const timestamp = (dateTime ? new Date(+dateTime) : new Date()).getTime();
    const format = formatTime(timestamp);
    const list = format.split(' ');

    return type === 'date' ? list[0] : list[1];
  }

  /**
   * 移除使用分隔符连接的图片路径
   * @param origin 原图片路径字符串
   * @param index 待移除路径 index
   */
  protected removeUrl(origin, index): string {
    const list = origin.split(strSeparator);
    if (~index) {
      list.splice(index, 1);
    }
    return list.join(strSeparator);
  }

  /**
   * 追加图片路径
   * @param origin 原图片路径字符串
   * @param url 图片路径
   */
  protected addUrl(origin, url): string {
    return origin ? `${origin}${strSeparator}${url}` : url;
  }
}
