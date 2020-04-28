import { Gender } from '@/models/enums';

/** 用户信息 */
export interface UserInfo {
  /** 昵称 */
  nickName?: string;
  /** ud */
  avatarUrl?: string;
  /** 生日 */
  birthday?: string;
  /** 婚姻 (1=已婚 2=未婚) */
  marriage?: string;
  /** 性别 */
  gender?: Gender;
  /** 兴趣爱好 */
  hobby?: string;
  /** 绑定手机号 */
  phoneNumber?: string;
  /** 用户名 */
  userName?: string;
  /** 微信号 */
  wxNumber?: string;
  /** 是否允许他人关注（0=否 1=是） */
  isFocus?: number;
  /** 一句话描述 */
  describe?: string;
  /** 签名 */
  signature?: string;
  /** 业务类型（0=个人业务 1=公司业务） */
  business?: number;
  /** 职称 */
  professional?: string;
}

/** 登陆信息 */
export interface LoginInfo {
  /** 用户名 */
  userName: string;
  /** 昵称 */
  nick: string;
  /** 头像 */
  icon: string;
  /** 描述 */
  desc: string;
  /** 性别 */
  gender: Gender;
  /** 生日 */
  birthday: number;
  /** 婚姻 */
  marriage: number;
}

export const EmptyLoginInfo = {
  userName: '',
  nick: '',
  icon: '',
  desc: '',
  gender: 0,
  birthday: 0,
  marriage: 0
};
