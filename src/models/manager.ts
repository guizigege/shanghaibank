import { Gender, businessType } from './enums';

/** 客户经理（管家）信息 */
export interface Manager {
  /** 头像图片路径 */
  avatarUrl: string;
  /** 大封面 */
  bigFrontCoverUrl: string;
  /** 小封面 */
  frontCoverUrl: string;
  /** 客户经理（管家） 姓名 */
  name: string;
  /** 签名 */
  signature: string;
  /** 描述 */
  description: string;
  /** 性别 */
  gender: Gender;
  /** 业务方向 */
  businessType: string;
  /** 职称 */
  title: string;
  /** 标签 */
  tags: Array<String>;
  /** 手机号码 */
  mobilePhone: string;
  /** 微信号码 */
  wechat: string;
  /** 职业亮点 */
  highlights: string;
  /** 观点 */
  viewpoint: string;
  /** 生活感悟 */
  life: string;
  /** 生活照图片路径 */
  photoUrl: Array<String>;
  /** 拓展信息 */
  ex: {
    userInfo: {
      photoUrl: string;
      bigFrontCoverUrl: string;
    }
  };
  productInfo: {
    /** 产品id */
    productId: number | null;
    /** 产品类型 */
    productType: number | null;
    /** 产品标题 */
    title: string;
    /** 产品内容 */
    content: string;
    /** 产品图片 */
    imageUrl: string;
    /** 跳转链接 */
    linkUrl: string;
    /** 礼物信息 */
    giftInfo: string;
    /** 活动开始时间 */
    beginTime: number | null;
    /** 活动结束时间 */
    endTime: number | null;
  };
}

export const EmptyManage = {
  avatarUrl: '',
  bigFrontCoverUrl: '',
  frontCoverUrl: '',
  name: '',
  signature: '',
  description: '',
  gender: 0,
  businessType: '',
  title: '',
  tags: [],
  mobilePhone: '',
  wechat: '',
  highlights: '',
  viewpoint: '',
  life: '',
  photoUrl: [],
  ex: {
    userInfo: {
      photoUrl: '',
      bigFrontCoverUrl: ''
    }
  },
  productInfo: {
    productId: null,
    productType: null,
    title: '',
    content: '',
    imageUrl: '',
    linkUrl: '',
    giftInfo: '',
    beginTime: null,
    endTime: null,
  }
};

export interface RangeBankList {
  /** id */
  userId: string;
  /** 头像 */
  icon: string;
  /** 名字 */
  userName: string;
  /** 手机号码 */
  mobile: string;
  /** 微信号码 */
  wxNumber: string;
  /** 地址 */
  address: string;
  /** 性别 */
  gender: Gender;
  /** 位置信息 */
  location: string;
  /** 总行 */
  head: string;
  /** 分行 */
  branch: string;
  /** 网点 */
  office: string;
  /** 距离（单位：米） */
  distance: number;
}
export interface ManagerList {
  /** id */
  userId: string;
  /** 姓名 */
  userName: string;
  /** 性别 */
  gender: Gender;
  /** 职位 */
  manager: string;
  /** 手机号码 */
  mobile: string;
  /** 邮箱 */
  email: string;
  /** 头像 */
  icon: string;
  /** 业务类型 */
  businessType: businessType;
  extendInfo: {
    userInfo: {
      bigFrontCoverUrl: string,
      description: string,
      frontCoverUser: string,
      highlights: string,
      life: string,
      photoUrl: string,
      productId: number,
      recommend: string,
      signature: string,
      tags: Array<string>,
    },
    wxInfo: {
      openId: string,
      session_key: string,
    }
  };
  /** 总行 */
  head: string;
  /** 分行 */
  branch: string;
  /** 网点 */
  office: string;
}
