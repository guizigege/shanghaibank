import service from '@/utils/request';
import { SwiperType, ProductType, CollectState, FocusState } from '@/models/enums';
import { UserInfo } from '@/models/user';
import { defaultLocation } from '@/utils/consts';

class ServiceApi {
  /**
   * 获取轮播列表
   * @param type 轮播类型
   */
  getClientSwiper(type: SwiperType) {
    return service.post(`user/banner/index`, { type });
  }

  /**
   * 获取产品列表
   * @param params 查询参数
   */
  productList(
    params: {
      la: number;
      lo: number;
      range: number;
      type: ProductType;
      searchStr?: string;
    } = {
      ...defaultLocation,
      type: ProductType.优品
    }
  ) {
    return service.post('user/map/index', params);
  }

  /**
   * 获取产品详情
   * @param productId 产品
   */
  getProductDetail(productId: string) {
    return service.post('user/product/info', { productId });
  }

  /**
   * 保存用户信息
   * @param params 用户信息
   */
  saveUserInfo(params: UserInfo) {
    return service.post('user/info/update_info', params);
  }

  /**
   * 保存用户当前位置信息
   */
  saveCurrentLocation(params: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }) {
    return service.post('user/info/location', params);
  }

  /**
   * 搜索附近
   */
  mapSearch(params: {
    pathT: string;
    table: string;
    field: string[];
    la: number;
    lo: number;
    range: number;
  }) {
    return service.post('user/map/search_sql', params);
  }

  /**
   * 更新产品收藏状态
   */
  updateCollectState(productId: number, state: CollectState) {
    const url = `user/collect/${state === CollectState.Collect ? 'add' : 'cancel'}_collect`;

    return service.post(url, { productId });
  }

  /**
   * 更新关注状态
   */
  updateFocusState(focusId: number, state: FocusState) {
    const url = `user/friending/${state === FocusState.Focus ? '' : 'cancel_'}focus`;

    return service.post(url, { focusId });
  }

  /**
   * 预约产品或活动
   * @param productId 产品 id
   */
  order(productId: number) {
    return service.post('user/order/order', { productId });
  }

  /**
   * 发起拼团
   * @param productId 产品 id
   */
  startGroup(productId: number) {
    return service.post('user/group/add_group', { productId });
  }

  /**
   * 附近网点
   * @param params 查询参数
   */
  vicinityBankList(
    params: {
      la: number;
      lo: number;
      range: number;
      office?: string;
    } = {
      ...defaultLocation,
      office: ''
    }
  ) {
    return service.post('user/map/near', params);
  }

  /**
   * 推荐的明星网点
   * @param params 位置信息
   */
  recommendBankList(
    params: {
      la: number;
      lo: number;
      range: number;
    } = defaultLocation
  ) {
    return service.post('user/map/star_office');
  }

  /**
   * 获取附近网点(含明星网点)信息
   * @param params 位置信息
   */
  getVicinityBankInfo(
    params: {
      la: number;
      lo: number;
      range: number;
      office?: string;
    } = {
      ...defaultLocation,
      office: ''
    }
  ) {
    return service.all([
      this.vicinityBankList(params),
      this.recommendBankList(params)
    ]);
  }

  /**
   * 网点下的所有产品
   * @param office 网点名称
   */
  officeProducts(office: string) {
    return service.post('user/map/office_product', { office });
  }

  /**
   * 获取产品评论
   * @param params 查询参数
   */
  productComments(params: { productId: string, commentId?: string, length?: number }) {
    return service.post('user/comment/get_comment_list', params);
  }

  /**
   * 添加评论
   * @param params 评论内容
   */
  newComments(params: { productId: string, content: string }) {
    return service.post('user/comment/add_comment', params);
  }

  /**
   * 添加回复
   */
  newReply(data) {
    return service.post('user/comment/add_revert', data);
  }

  /**
   * 获取单条评论的回复信息
   */
  commentReplyList(data) {
    return service.post('user/comment/get_revert_list', data);
  }

  /**
   * 获取客户经理列表
   * @param businessType 业务类型数组，为空则获取全部类型数据1=个人业务 2=公司业务
   */
  getManagerList(
    params: {
      head: string,
      branch: string,
      office: string,
      businessType?: number[],
    }
  ) {
    return service.post('user/manager/get_manager_list', params);
  }

  /**
   * 获取产品信息列表
   */
  getProductList() {
    return service.post('user/manager/get_product_list', {});
  }

  /**
   * 获取客户经理详情
   * @param userId 客户经理Id
   */
  getManagerInfo(userId: string) {
    return service.post('user/manager/get_manager_info', { userId });
  }

  /**
   * 获取范围内网点列表
   * @param la 经度  lo 纬度  range 查询范围
   */
  getRangeBankList(
    params: {
      la?: number;
      lo?: number;
      range?: number;
      allManager?: boolean;
    } = {
      ...defaultLocation
    }
  ) {
    return service.post('user/manager/get_range_manager', params);
  }

  /**
   * 获取订单列表
   * @param productType 订单类型（优品：1   活动：2）
   *        type 标签类型（拼团中：1    待去网点：2   全部：3）
   *        createTime 时间
   *        length 长度
   */
  getOrderList(
    params: {
      productType: number,
      labelType: number,
      length: number,
      createTime: number
    }
  ) {
    return service.post('user/group/get_client_orders', params);
  }

  /**
   * 获取拼团列表
   */
  getGroupList(data) {
    return service.post('user/group/get_group_list', data);
  }

  /**
   * 参与拼团
   * @param productId 产品id
   *         groupId 拼团id
   */
  takeGroup(
    params: {
      productId: number;
      groupId: number;
    }
  ) {
    return service.post('user/group/take_group', params);
  }

  /**
   * 发起拼团
   * @param productId 产品id
   */
  addGroup(productId: number) {
    return service.post('user/group/add_group', { productId });
  }

  /**
   * @param userId 用户id
   */
  getInfoCount(userId: any) {
    return service.post('user/info/get_info_count', { userId });
  }

  /**
   * 获取收藏列表
   * @params userId  用户id
   *          length  长度（默认10）
   *          createTime  时间
   */
  getCollectList(
    params: {
      userId: string,
      length?: number,
      createTime?: number
    }
  ) {
    return service.post('user/collect/get_collect_list', params);
  }

  /**
   * 获取用户信息
   */
  getClientInfo(
    params: {
      userId: string
    }
  ) {
    return service.post('user/manager/get_client_info', params);
  }

  /**
   * 钱包提现
   * @params selectId 提现数额
   */
  costRed(selectId: string) {
    return service.post('user/red/cost', { selectId });
  }

  /**
   * 我的零钱
   */
  myCash() {
    return service.post('user/red/cash');
  }

  /**
   * 我的红包明细
   */
  redPacketDetail() {
    return service.post('user/red/userRedList');
  }

  /**
   * 我的提现明细
   */
  withdrawDetail() {
    return service.post('user/red/userCostList');
  }

  /**
   * 客户提现明细
   */
  userCostList() {
    return service.get('user/red/userCostList');
  }

  /**
   * 客户领取红包
   */
  userGetRed(data) {
    return service.post('user/red/get', data);
  }

  /**
   * 网点详情
   */
  getBankInfo(data) {
    return service.post('user/manager/get_office_info', data);
  }

  /**
   * 扫码
   */
  scanQR(data) {
    return service.post('user/group/update_group_status', data);
  }
}

export default new ServiceApi();
