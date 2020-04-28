import {
  ServiceBaseURL,
  EmptyImagePlaceholder,
  IconError,
  defaultDistance
} from './consts';
import { $Toast } from '../../static/iview/base';

/**
 * 数字格式化（个位数前而补零）
 * @param n 待格式化数字
 * @example
 *  formatNumber(5);
 */
export function formatNumber(n: number): string {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

/**
 * 时间格式化（yyyy-MM-dd HH:mm）
 * @param timestamp 待格式化时间戳
 * @example
 *  formatTime(1546426560000);
 */
export function formatTime(timestamp: number): string {
  const { year, month, day, hour, minute } = getDateTimeInfo(timestamp);

  const t1 = [year, month, day].map(formatNumber).join('-');
  const t2 = [hour, minute].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

/**
 * 时间格式化（yyyy/MM/dd）
 * @param timestamp 待格式化时间戳
 * @example
 *  formatDate(1546426560000);
 */
export function formatDate(timestamp: number): string {
  const { year, month, day } = getDateTimeInfo(timestamp);

  return [year, month, day].map(formatNumber).join('/');
}

/**
 * 时间间隔（当大于 3 天时，直接返回 yyyy/MM/dd）
 * @param timestamp 待计算时间戳
 */
export function timeAgo(timestamp: number = new Date().getTime()): string {
  const { day, hour, minute, second, millisecond } = timeDuration(timestamp);

  if (day > 3) {
    return formatDate(timestamp);
  }

  if (day > 0 && day <= 3) {
    return `${day} 天前`;
  }

  if (day <= 0 && hour > 0) {
    return `${hour} 小时前`;
  }

  if (hour <= 0 && minute > 0) {
    return `${minute} 分钟前`;
  }

  if (second < 60 && second > 0) {
    return `${second} 秒前`;
  }

  if (millisecond > 0) {
    return '刚刚';
  }

  return '';
}

/**
 * 获取日期时间内容
 * @param timestamp 时间戳
 */
export function getDateTimeInfo(timestamp: number) {
  const date = new Date(+timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return { year, month, day, hour, minute, second };
}

/**
 * 计算给定时间与当前时间的间隔
 * @param timestamp 时间戳
 */
export function timeDuration(timestamp) {
  const now = new Date().getTime();
  let ms = now - timestamp;

  if (ms < 0) {
    ms = -ms;
  }

  const time = [Math.floor(ms / 86400000),
    Math.floor(ms / 3600000) % 24,
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60,
    Math.floor(ms) % 1000]
    .map(c => {
      return c.toString().length === 1 ? '0' + c : c;
    });
  return {
    day: time[0],
    hour: time[1],
    minute: time[2],
    second: time[3],
    millisecond: time[4]
  };
}

/**
 * 深拷贝
 * @param obj 待拷贝对象
 * @example
 *  const obj = [{ size: 1, color: 'red' }, 1, 'a', true];
 *  const newObj = deepClone(obj);
 */
export function deepClone(obj) {
  if (!obj) {
    return obj;
  }

  let clone: {} | [] = {};
  Object.keys(obj).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );

  if (Array.isArray(obj)) {
    (clone as Array<any>).length = obj.length;
    return Array.from(clone as Array<any>);
  } else {
    return clone;
  }
}

/**
 * 深度比较两个值是否相等
 * @param a 待比较值 a
 * @param b 待比较值 b
 */
export function equals(a, b): boolean {
  if (a === b) {
    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }
  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }
  if (a.prototype !== b.prototype) {
    return false;
  }

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  return keys.every(k => equals(a[k], b[k]));
}

/**
 * 防抖
 * @param fn 回调函数
 * @param ms 延迟时间（毫秒）
 * @param thisArg this 上下文
 * @example
 *  onInput = debounce(e => {
 *    this.inputVal = e.mp.detail.value;
 *  });
 */
export function debounce(fn, ms = 500, thisArg?: any): Function {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(thisArg, args), ms);
  };
}

/**
 * 是否为有效的 JSON 字符串
 * @param str 待校验字符串
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 字符串超出指定长度部分使用省略号代替
 * @param str 字符串
 * @param num 显示字符串长度（不含省略号）
 */
export function truncateString(str: string, num: number = 20): string {
  return str.length > num
    ? `${str.slice(0, num > 3 ? num - 3 : num)} ...`
    : str;
}

/**
 * 获取系统图片路径
 * @param fileId 文件id
 */
export function getImageUrl(fileId: string): string {
  if (`${fileId}`.indexOf('https://wx.qlogo.cn/') !== -1) {
    return fileId;
  } else if (fileId && fileId !== 'undefined' && fileId !== 'null') {
    return `${ServiceBaseURL}/attachment/${fileId}`;
  } else {
    return EmptyImagePlaceholder;
  }
}

/**
 * 处理错误
 * @param err 错误信息
 */
export function handleError(err = '出错了') {
  console.error(err);

  // 显示图标时 title 文本最多显示 7 个汉字长度
  // wx.showToast({
  //   title: `${err}`,
  //   image: IconError,
  //   duration: 2000
  // });

  $Toast({
    content: `${err}`,
    // image: IconError,
    // duration: 2000,
    icon: 'prompt'
  });
}

/**
 * 带参数返回返回上一页面
 * @param data 参数
 * @param 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
 */
export function navigateBackWithData(data, delta = 1) {
  const pages = getCurrentPages();

  if (pages.length - 1 >= delta) {
    const prevPage = pages[pages.length - 1 - delta];
    prevPage.data = data;
  }

  wx.navigateBack({ delta });
}

/**
 * 在使用 navigateBackWithData 返回当前页面时，获取页面参数
 */
export function getCurrentPageData() {
  const pages = getCurrentPages();

  if (pages.length > 0) {
    const currPage = pages[pages.length - 1];

    return currPage.data;
  }

  return null;
}

/**
 * 距离默认转换为 2 位小数的精度
 * @param distance 距离数值
 * @param fractionDigits 小数位精度
 */
export function distanceToFixed(distance = '0', fractionDigits = 2) {
  return +distance > +defaultDistance
    ? (+distance / 1000).toFixed(fractionDigits)
    : defaultDistance;
}

/**
 * 去除两个数组相同项，并返回一个包含两个数组所有不重复项的数组
 * @param {*} a 新数组 a
 * @param {*} b 原有数组 b
 * @param {*} [compareFn] 比较项是否相同的函数
 */
export function unionWith(a, b, compareFn) {
  return Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => compareFn(x, y)) === -1)]));
}

/**
 * 格式化后台返回单位为分的金额
 * @param value
 * @example formatMoney(1000000) return 10,000.00
 */
export function formatMoney(value) {
  let yuan:number|string = value/100;
  yuan = parseFloat((yuan + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
  let big = yuan.split(".")[0].split("").reverse();
  let small = yuan.split(".")[1];
  let money = "";
  for (let i = 0; i < big.length; i++) {
    money += big[i] + ((i + 1) % 3 == 0 && (i + 1) != big.length ? "," : "");
  }
  return money.split('').reverse().join('') + "." + small;
}

/**
 * 检测输入的金额是否合法(最多两位小数)
 * @param money
 * @returns {boolean}
 * @example checkMoney('00012'|'12.12'|'32.9'|'0012.12'|0000) return true
 *           checkMoney('12.121212'|'0000.000'|'.00') return false
 *
 */
export function checkMoney(money) {
  let re = /^\d+(\.\d{0,2})?$/;
  return re.test(money);
}

/**
 * 格式化支付的金额
 * @param money
 */
export function formatPayMoney(money) {
  return Number(money.replace(/^0*/, '')).toFixed(2)
}

/**
 * 去掉千位的逗号
 */
export function formatThousandMoney(money) {
  return money.split(',').join('')
}
