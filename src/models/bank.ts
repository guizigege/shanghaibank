import { SignUpAuditState, AuditType } from './enums';

export interface BankInfo {
  /** 头像 */
  avatar: string;
  /** 银行名称 */
  bankName: string;
  /** 工作日上午开始上班时间 */
  weekdayAmStartHour: string;
  /** 工作日上午结束上班时间 */
  weekdayAmEndHour: string;
  /** 工作日下午开始上班时间 */
  weekdayPmStartHour: string;
  /** 工作日下午结束上班时间 */
  weekdayPmEndHour: string;
  /** 节假日上午开始上班时间 */
  holidayAmStartHour: string;
  /** 节假日上午结束上班时间 */
  holidayAmEndHour: string;
  /** 节假日下午开始上班时间 */
  holidayPmStartHour: string;
  /** 节假日下午结束上班时间 */
  holidayPmEndHour: string;
  /** 位置信息 */
  location: string;
}

/**
 * 审核操作信息
 */
export interface AuditAction {
  /**
   * 审核状态
   */
  status: SignUpAuditState;

  /**
   * 描述（拒绝理由）
   */
  opDesc?: string;
  /**
   * 审核信息所属用户
   */
  distUserId: string;
}

/** 审核数据 */
export interface AuditData {
  /** 数据内容类型 */
  type: AuditType;
  /** 数据信息 */
  info: any;
}

/** 初始银行信息 */
export const emptyBankInfo: BankInfo = {
  bankName: '',
  avatar: '',
  weekdayAmEndHour: '',
  weekdayAmStartHour: '',
  weekdayPmEndHour: '',
  weekdayPmStartHour: '',
  holidayAmEndHour: '',
  holidayAmStartHour: '',
  holidayPmEndHour: '',
  holidayPmStartHour: '',
  location: ''
};

/** 初始位置信息 */
export const emptyLocation = {
  name: '',
  address: '',
  latitude: '',
  longitude: ''
};

// export interface BankInfo {
//
// }
