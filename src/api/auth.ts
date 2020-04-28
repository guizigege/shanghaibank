import { Roles, AppType } from '@/models/enums';
import storage from '@/utils/storage';
import WxApi from './wx';
import service from '@/utils/request';

/**
 * 用户授权认证信息
 */
class AuthApi {
  private loginObj: any;

  /**
   * 登录
   * @param type 登录类型（客户端/网点端）
   */
  async login(type: AppType) {
    const code = await WxApi.login();
    const authSetting = await WxApi.getSetting();

    storage.set('authSetting', authSetting);

    return service.post('login/wx_login', { code, type });
  }

  /**
   * 获取用户微信授权信息
   */
  getAuthSetting() {
    return storage.get('authSetting');
  }

  /**
   * 获取当前用户角色
   */
  getRoles() {
    return this.loginInfo && this.loginInfo.roles ? this.loginInfo.roles : [];
  }

  /**
   * 用户登录信息
   */
  get loginInfo() {
    if (!this.loginObj) {
      this.loginObj = storage.get('loginInfo');
    }

    return this.loginObj;
  }

  /**
   * 是否客户端
   */
  get isClientApp() {
    return this.loginInfo && this.loginInfo.appId
      ? this.loginInfo.appId === AppType.Client
      : false;
  }

  /**
   * 是否网点端
   */
  get isAdminApp() {
    return this.loginInfo && this.loginInfo.appId
      ? this.loginInfo.appId === AppType.Admin
      : false;
  }

  /**
   * 当前用户是否含支行角色
   */
  get isBranch() {
    return this.isAdminApp && this.isIncludeRole(Roles.Branch);
  }

  /**
   * 当前用户是否含客户经理角色
   */
  get isManager() {
    return this.isAdminApp && this.isIncludeRole(Roles.Manager);
  }

  /**
   * 当前用户是否含支行网点角色
   */
  get isOffice() {
    return this.isAdminApp && this.isIncludeRole(Roles.Office);
  }

  private isIncludeRole(role: Roles) {
    const roles = this.getRoles();
    return roles.includes(role);
  }
}

export default new AuthApi();
