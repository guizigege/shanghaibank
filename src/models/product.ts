import { ProductType, ProductAuditState } from './enums';

/** （优品/活动）产品 */

export interface Product {
  /** 产品Id */
  productId?: number;
  /** 产品类型 */
  productType: ProductType;
  /** 标题 */
  title: string;
  /** 标题 */
  content: string;
  /** 图片(banner)链接 */
  imageUrl: string;
  /** 跳转(封面)链接 */
  linkUrl?: string;
  /** 其他链接 */
  otherUrl?: string;
  /** 活动开始时间(发布时间) */
  beginTime?: string;
  /** 活动结束时间 */
  endTime: string;
  /** 微信号码 */
  wxNumber?: string;
  /** 手机号码 */
  mobile?: string;
  /** 地址 */
  address: string;
  /** 扩展信息(后端用) */
  extendInfo?: string;
  /** 礼品信息 */
  giftInfo?: string;
  /** 客户经理 */
  managerUserId?: string;
  /** 拼团总人数  */
  groupSum?: number;
  /** 拼团间隔时间  */
  groupTime?: number;
  /** 审核状态 */
  state: ProductAuditState;
  // 浏览量
  personLook: number;
  // 拼团人数限制
  groupNum: number;
  // 已拼团人数
  groupBuy: number;

  status: ProductAuditState;
  /** 银行信息 */
  bankInfo: string;
  /** 最后编辑时间 */
  updateTime?: number;
  /** 距离 */
  distance?: string;
  /** 位置信息 */
  location?: any;
  /** 纬度 */
  latitude?: string;
  /** 经度 */
  longitude?: string;
}

/** （优品/活动）产品礼品 */
export interface Gift {
  /** 礼品类型 */
  type: 'person' | 'group';
  /** 礼品名称 */
  name: string;
  /** 礼品描述 */
  desc: string;
  /** 礼品图片 */
  imageUrl: string;
}

/** 初始（优品/活动）产品礼品对象 */
export const emptyGift: Gift = {
  type: 'person',
  name: '',
  desc: '',
  imageUrl: ''
};

export interface GroupListItem {
  groupId: number;
  icon: string;
  realIcon: string;
  productId: number;
  status: number;
  total: number;
  userId: string;
  userName: string;
  isCaptain: boolean;
  isJoin: boolean;
  isExp: boolean;
  timeBack: number;
  time: string;
}

export const emptyGroupListItem = {
  groupId: 0,
  icon: '',
  realIcon: '',
  productId: 0,
  status: 0,
  total: 0,
  userId: '',
  userName: '',
  isCaptain: false,
  isJoin: false,
  isExp: false,
  timeBack: 0,
  time: ''
};

// 拼团列表信息
export interface GroupList {
  amount: number;
  count: number;
  groupId: number;
  groupSum: number;
  groupTime: number;
  isGroupLeader: number;
  subAmount: number;
  rows: Array<GroupListItem>;
}

// 订单信息
export interface OrderItem {
  userId: string; // 用户id
  groupId: number; // 拼团id
  isGroup: boolean;
  orderID: string; // 订单号
  isGroupLeader: number; // 是否团长（0=否 1=是）
  createTime: number; // 下单时间
  createTimeStr: string; // 下单时间
  groupCreateTime: number; // 拼团发起时间
  groupCreateTimeStr: string;
  total: number; // 拼团人数
  status: number; // 订单状态（1=拼团中，2=匹配中，3=待去网点 4=已完成 5=已过期）
  productId: number; // 产品Id
  productType: number; // 产品类型
  title: string; // 标题
  content: string; // 内容
  tags: string; // 标签
  imageUrl: string; // 图片url
  realImageUrl: string;
  linkUrl: string; // 跳转url
  beginTime: number; // 活动开始时间
  endTime: number; // 活动结束时间
  beginTimeStr: string;
  groupEndTimeStr: string;
  endTimeStr: string; // 拼团截至时间
  wxNumber: string; // 微信号
  mobile: string; // 电话
  address: string; // 地址
  giftInfo: string; // 礼物信息
  bankInfo: any; // 银行信息
  groupSum: number; // 拼团总人数
  groupTime: number; // 拼团间隔时间
  star: number; // 产品星级，默认五星
  location: string; // 地址
  latitude: number; // 纬度
  longitude: string; // 经度
  dist: string; // 距离
}

export const emptyOrderItem: OrderItem = {
  userId: '', // 用户id
  groupId: 0, // 拼团id
  isGroup: false, // 是否是拼团（false=预约 true=拼团）
  orderID: '', // 订单号
  isGroupLeader: 0, // 是否团长（0=否 1=是）
  createTime: 0, // 下单时间
  createTimeStr: '',
  groupCreateTime: 0, // 拼团发起时间
  groupCreateTimeStr: '',
  total: 0, // 拼团人数
  status: 0, // 订单状态（1=拼团中，2=匹配中，3=待去网点 4=已完成 5=已过期）
  productId: 0, // 产品Id
  productType: 0, // 产品类型
  title: '', // 标题
  content: '', // 内容
  tags: '', // 标签
  imageUrl: '', // 图片url
  realImageUrl: '',
  linkUrl: '', // 跳转url
  beginTimeStr: '',
  groupEndTimeStr: '',
  beginTime: 0, // 活动开始时间
  endTime: 0, // 活动结束时间
  endTimeStr: '', // 拼团截至时间
  wxNumber: '', // 微信号
  mobile: '', // 电话
  address: '', // 地址
  giftInfo: '', // 礼物信息
  bankInfo: {}, // 银行信息
  groupSum: 0, // 拼团总人数
  groupTime: 0, // 拼团间隔时间
  star: 0, // 产品星级，默认五星
  location: '', // 地址
  latitude: 0, // 纬度
  longitude: '', // 经度
  dist: '' // 距离
};

/** （优品/活动）产品详情 */
export interface ProductDetail {
  collectState: number;
  comment: { count: number; rows: [] };
  group: { count: number; rows: any[], groupTime: number, groupId: number, isGroupLeader: number };
  groupCount: number;
  groupState: number;
  orderState: number;
  red: any[];
  product: {
    productId: number;
    productType: number;
    userId: string;
    status: number;
    opUserId: string;
    opTime: number;
    opDesc: string;
    title: string;
    content: string;
    imageUrl: string;
    linkUrl: string;
    otherUrl: string;
    beginTime: 0;
    endTime: 0;
    head: string;
    branch: string;
    office: string;
    managerUserId: string;
    wxNumber: string;
    mobile: string;
    address: string;
    extendInfo: string;
    groupSum: 0;
    groupTime: 0;
    createTime: 0;
    updateTime: 0;
    qrId: string;
    star: 5;
    giftInfo: string;
    bankInfo: string;
    latitude: string;
    longitude: string;
    exposureCount: number;
    location: any;
  };
}

/** 初始（优品/活动）产品详情对象 */
export const emptyProductDetail: ProductDetail = {
  collectState: 0,
  comment: { count: 0, rows: [] },
  group: { count: 0, rows: [], groupTime: 0, groupId: 0, isGroupLeader: 0 },
  groupCount: 0,
  groupState: 0,
  orderState: 0,
  red: [],
  product: {
    productId: 0,
    productType: 0,
    userId: '',
    status: 0,
    opUserId: '',
    opTime: 0,
    opDesc: '',
    title: '0',
    content: '0',
    imageUrl: '',
    linkUrl: '',
    otherUrl: '',
    beginTime: 0,
    endTime: 0,
    head: '',
    branch: '',
    office: '',
    managerUserId: '',
    wxNumber: '',
    mobile: '',
    address: '',
    extendInfo: '{}',
    groupSum: 0,
    groupTime: 0,
    createTime: 0,
    updateTime: 0,
    qrId: '',
    star: 5,
    giftInfo: '',
    bankInfo: '',
    latitude: '',
    longitude: '',
    exposureCount: 0,
    location: {}
  }
};

/** 初始产品对象 */
export const emptyProduct: Product = {
  productType: ProductType.优品,
  title: '',
  content: '',
  imageUrl: '',
  linkUrl: '',
  otherUrl: '',
  beginTime: '',
  endTime: '',
  address: '',
  extendInfo: '',
  giftInfo: '',
  managerUserId: '',
  groupSum: 0,
  groupTime: 0,
  status: ProductAuditState.草稿,
  bankInfo: '',
  state: ProductAuditState.草稿,
  personLook: 0,
  groupNum: 0,
  groupBuy: 0
};
