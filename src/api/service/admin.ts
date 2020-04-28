import { Product } from '@/models/product';
import WxApi from '../wx';
import service from '@/utils/request';
import {
  SignUpAuditState,
  ProductType,
  ProductAuditState,
  SwiperType,
  SwiperStatus,
  RedPacketAuditState,
  AuditState
} from '@/models/enums';
import { AuditAction } from '@/models/bank';
import { Announcement } from '@/models/announcement';
import { defaultLocation } from '@/utils/consts';

class ServiceApi {
  /**
   * 注册
   * @param data 注册信息
   */
  bankSignUp(data) {
    return service.post('admin/bank/submit', data);
  }

  /**
   * 支行网点列表
   */
  bankList(params = { head: '', branch: '上海银行深圳分行' }) {
    return service.post('admin/bank/office', params);
  }

  /**
   * 支行网点列表(含位置信息)
   */
  bankListWithLocation(params = { head: '', branch: '上海银行深圳分行' }) {
    return service.post('admin/bank/office_1', params);
  }

  /**
   * 业务方向列表
   */
  businessTypes() {
    const selectType = 0; // 业务方向
    return service.post('admin/bank/select', { selectType });
  }

  /**
   * 客户经理列表
   */
  managerList(params: { head: string; branch: string; office: string }) {
    return service.post('admin/bank/manager', params);
  }

  /**
   * 同行的客户经理
   */
  officeManagers() {
    return service.post('user/product/managers');
  }

  /**
   * 产品信息保存为草稿
   * @param product 产品信息
   */
  saveProduct(product: Product) {
    return service.post('user/product/set', product);
  }

  /**
   * 保存产品
   */
  submitProduct(productId: string) {
    return service.post('user/product/submit', { productId });
  }

  /**
   * 分行审核(支行网点、客户经理注册)信息列表
   */
  auditSignUpInfo() {
    return service.post('admin/bank/list', { status: SignUpAuditState.审核中 });
  }

  /**
   * 支行网点产品审核信息列表
   */
  auditProducts(office = '') {
    return service.post('user/product/branch_list', {
      status: SignUpAuditState.审核中,
      office
    });
  }

  /***
   * 审核(支行网点、客户经理注册)
   */
  audit(params: AuditAction) {
    return service.post('admin/bank/upt', params);
  }

  /**
   * 红包审核
   */
  auditRedPacket(params: {
    packetId: string;
    status: AuditState;
    opDesc?: string;
  }) {
    const isApproved = params.status === AuditState.Approved;
    const url = `user/red/${isApproved ? 'pass' : 'rebut'}`;
    const data = {
      ...params,
      opDesc: isApproved ? null : params.opDesc
    };

    return service.post(url, data);
  }

  /**
   * (网点端)获取产品列表
   * @param params 查询参数
   */
  productList(params: { productType: ProductType; complex?: string }) {
    params.complex = params.complex || '';
    return service.post('user/product/admin_yp_hd_list', params);
  }

  /**
   * 产品详情
   * @param productId 产品 Id
   */
  productDetail(params: { productId: string }) {
    return service.post('user/product/admin_yp_hd_info', params);
  }

  /**
   * 产品审核通过
   * @param params 产品审核信息
   */
  auditProduct(params: {
    productId: string;
    status: ProductAuditState;
    opDesc?: string;
  }) {
    const method = params.status === ProductAuditState.通过 ? 'pass' : 'rebut';
    return service.post(`user/product/${method}`, params);
  }

  /**
   * 获取支行网点下的审核通过的产品
   * @param name
   */
  getProductsByOfficeName(name: string) {
    return service.post(`user/banner/office_product_list`, { office: name });
  }

  /**
   * 文件上传
   * @param file 文件
   */
  uploadFile(filePath: string) {
    return WxApi.uploadFile(filePath);
  }

  /**
   * 下载文件
   * @param fileId 文件 Id
   */
  downloadFile(fileId: string) {
    return WxApi.downloadFile(fileId);
  }

  /**
   * 获取轮播列表【管理】
   * @param type 轮播类型
   */
  getSwiperList(type: SwiperType) {
    return service.post(`user/banner/index_admin`, { type });
  }

  /**
   * 获取轮播详情
   * @param bannerId id
   */
  getSwiperDetail(bannerId: string) {
    return service.post(`user/banner/info`, { bannerId });
  }

  /**
   * 添加轮播
   * @param parms 轮播信息
   */
  addSwiper(parms) {
    return service.post(`user/banner/add`, parms);
  }

  /**
   * 删除轮播
   * @param bannerId 轮播信息 id
   */
  removeSwiper(bannerId: number) {
    return service.post(`user/banner/del`, { bannerId });
  }

  /**
   * 设置轮播状态
   * @param bannerId 轮播信息 id
   * @param status 状态
   */
  setSwiperStatus(bannerId: number, status: SwiperStatus) {
    return service.post(`user/banner/set_status`, { bannerId, status });
  }

  /**
   * 增加新公告
   */
  addAnnouncement(params: Announcement) {
    return service.post('user/notice/add_notice', params);
  }

  /**
   * 删除公告
   */
  delAnnouncement(params) {
    return service.post('/user/notice/del_notice', params);
  }

  /**
   * 编辑公告
   */
  editAnnouncement(params) {
    return service.post('/user/notice/edit_notice', params);
  }

  /**
   * 获取公告列表
   */
  getAnnouncementList(data) {
    return service.post('user/notice/get_notice_list', data);
  }

  /**
   * 获取帮助列表
   */
  getHelpList(data) {
    return service.post('user/help/get_help_list', data);
  }

  /**
   * 增加新帮助
   */
  addHelp(params: Announcement) {
    return service.post('user/help/add_help', params);
  }

  /**
   * 保存个人信息
   */
  saveInfo(data) {
    return service.post('user/info/update_info', data);
  }

  /**
   * 个人产品列表
   */
  recommendProducts() {
    return service.post('user/manager/get_product_list');
  }

  /**
   * 发送验证码
   */
  sendSMS(data) {
    return service.post('user/sms/send', data);
  }

  /**
   * 验证验证码
   */
  verifySMS(data) {
    return service.post('user/sms/verify', data);
  }

  /**
   * 管理端上报位置坐标
   */
  saveBankLocation(data) {
    return service.post('admin/bank/location', data);
  }

  /**
   * 获取客户经理列表
   */
  getOfficeManageList(data) {
    return service.post('user/manager/get_manager_list', data);
  }

  /**
   * 获取客户经理详情
   */
  getOfficeManageDetail(data) {
    return service.post('user/manager/get_manager_info', data);
  }

  /**
   * 获取消息列表
   */
  getMsgList(data) {
    return service.post('user/message/get_message_list', data);
  }

  /**
   * 获取消息详情列表
   */
  getMsgDetailList(data) {
    return service.post('user/message/get_message_info', data);
  }

  /**
   * 发消息
   */
  sendMsg(data) {
    return service.post('user/message/send_message', data);
  }

  /**
   * 获取关注列表
   */
  attentionList(data) {
    return service.post('user/friending/get_focus_list', data);
  }

  /**
   * 关注
   */
  attentionAdd(data) {
    return service.post('user/friending/focus', data);
  }

  /**
   * 取消关注
   */
  attentionDel(data) {
    return service.post('user/friending/cancel_focus', data);
  }

  /**
   * 获取粉丝列表
   */
  fanList(data) {
    return service.post('user/friending/get_fens_list', data);
  }

  /**
   * 获取评论和回复待审列表
   */
  commentCheckList(data) {
    return service.post('user/comment/get_check_list', data);
  }

  /**
   * 审核评论或回复
   */
  checkComment(data) {
    return service.post('user/comment/check_comment', data);
  }

  /**
   * 获取网点列表
   */
  getCommonOfficeList() {
    return service.post('user/manager/get_common_office_list');
  }

  /**
   * 获取产品列表（网点/客户经理）
   */
  getCommonProductList(data) {
    return service.post('user/manager/get_common_product_list', data);
  }

  /**
   * 获取分行列表
   */
  getBranchList(head: string) {
    return service.post('admin/bank/branch', { head });
  }

  /**
   *  添加红包
   */
  addRedPacket(params: {
    productIds: number[];
    totalMoney: number;
    num: number;
    rangeStart: number;
    rangeEnd: number;
    beginTime: number;
    endTime: number;
    condition: string;
  }) {
    return service.post('user/red/add', params);
  }

  /**
   *  红包审核列表
   */
  getRedAuditList() {
    return service.get('user/red/list', { status: RedPacketAuditState.待审核 });
  }

  /**
   *  删除红包
   */
  delRed(params: { packetId: number; opDesc: string }) {
    return service.post('user/red/del', params);
  }

  /**
   *  获取红包
   */
  getRedPacket(params: { packetId: number; opDesc: string }) {
    return service.post('user/red/rebut', params);
  }

  /**
   * 网点产品
   */
  getOfficeProductList(status: number) {
    return service.post('user/product/office_list', { status });
  }

  /**
   * 设置红包条件
   */
  setRed(data) {
    return service.post('user/red/setRedCondition', data);
  }

  /**
   * 获取红包条件
   */
  getRed() {
    return service.post('user/red/getRedCondition');
  }

  /**
   * 管理端首页地图客户统计
   */
  getCustomerStatistics(
    params: {
      la: number;
      lo: number;
      range?: number;
      office?: string;
    } = {
      ...defaultLocation
    }
  ) {
    return service.post('user/map/index_admin', params);
  }

  /**
   * 获取任务订单列表
   */
  getOrderList(data) {
    return service.post('user/group/get_admin_list', data);
  }

  /**
   * 获取任务订单详情
   */
  getOrderItem(data) {
    return service.post('user/group/get_group_product_info', data);
  }

  /**
   * 获取任务收藏详情
   */
  getCollentItem(data) {
    return service.post('user/collect/get_collect_users', data);
  }

  /**
   * 网点端用户金额
   */
  myCash() {
    return service.get('user/red/cash_admin');
  }

  /**
   * （消耗红包）提现
   */
  costRed() {
    return service.get('user/red/cost');
  }

  /**
   * 网点订单详情
   */
  getWithdrawList() {
    return service.get('user/red/orderList');
  }

  /**
   * 网点红包列表
   */
  getRedList() {
    return service.get('user/red/listByOffice');
  }

  /**
   * 网点红包详情
   */
  getRedInfo(packetId: number) {
    return service.get('user/red/infoByOffice',{ packetId });
  }

  /**
   *  红包详情
   */
  getAuditRedInfo(packetId: number) {
    return service.get('user/red/info', { packetId });
  }

  /**
   * 网点充值
   */
  recharge(
    params: {
      desc: string,
      totalFee: number
    }
  ) {
    return service.post('user/red/order', params);
  }
}

export default new ServiceApi();
