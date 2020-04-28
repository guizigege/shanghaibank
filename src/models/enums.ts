/** App 类型 */
export enum AppType {
  /** 客户端 */
  Client = 'client',
  /** 网点端 */
  Admin = 'admin'
}

/** 注册类型 */
export enum SignUpType {
  客户经理 = 'manager',
  网点 = 'office'
  // 总行 = 'head'
}

/** 审核状态 */
export enum AuditState {
  /** 审核通过 */
  Approved = 2,
  /** 审核不通过 */
  Rejected = 3
}

/** 评论审核状态 */
export enum AuditCommentState {
  /** 审核通过 */
  Approved = 2,
  /** 审核不通过 */
  Rejected = 4
}

/** 注册审核状态 */
export enum SignUpAuditState {
  未提交资料 = 0,
  审核中 = 1,
  审核通过 = AuditState.Approved,
  驳回 = AuditState.Rejected
}

/** 产品审核状态 */
export enum ProductAuditState {
  /** 保存草稿 */
  草稿 = 0,
  /** 提交待审 */
  待审核 = 1,
  /** 审核通过 */
  通过 = AuditState.Approved,
  /** 审核不通过 */
  不通过 = AuditState.Rejected,
  /** 撤销/中止 */
  下架 = 4,
  /** 待发布 */
  待发布,
  /** 已发布 */
  已发布
}

/** 红包审核状态 */
export enum RedPacketAuditState {
  待审核 = 0,
  审核通过 = 1,
  驳回 = 2,
  被终止 = 3
}

/** 性别 */
export enum Gender {
  未知 = 0,
  男,
  女
}

/** 婚姻 */
export enum Marriage {
  未知 = 0,
  未婚,
  已婚,
}

/** 订单类型 */
export enum OrderStatus {
  拼团中 = 1,
  匹配中,
  待去网点,
  已完成,
  已过期
}

/** 拼团成员类型 */
export enum GroupType {
  团长 = 1,
  成员 = 0
}

/** 产品类型 */
export enum ProductType {
  优品 = 1,
  活动 = 2
}

/** 审核类型 */
export enum AuditType {
  /** 客户经理 */
  Manager = 0,
  /** 网点 */
  Office,
  /** 优品 */
  Superior,
  /** 活动 */
  Promotion,
  /** 红包 */
  RedPacket,
}

/** 用户角色 */
export enum Roles {
  /** 总行 */
  Head = 'head',
  /** 分行 */
  Branch = 'branch',
  /** 客户经理 */
  Manager = 'manager',
  /** 运行网点 */
  Office = 'office'
}

/** 公告相关 */
export enum EAnnouncement {
  /** 公告每页展示数量 */
  AnnouncementPageCount = 10,
  /** 公告标题长度 */
  TitleMaxLength = 20,
  /** 公告内容最大长度 */
  ContentMaxLength = 200
}

/** 轮播类型 */
export enum SwiperType {
  /** 首页轮播 */
  Home = 0,
  /** 附近轮播 */
  Vicinity
}

/** 轮播状态 */
export enum SwiperStatus {
  /** 发布 */
  Online = 1,
  /** 下线 */
  Offline = 0
}

/** 收藏状态 */
export enum CollectState {
  /** 收藏 */
  Collect = 1,
  /** 取消收藏 */
  Cancel = 0
}

/** 关注状态 */
export enum FocusState {
  /** 关注 */
  Focus = 1,
  /** 未关注 */
  Cancel = 0
}

/** 业务类型 */
export enum businessType {
  /** 个人业务 */
  personal = 1,
  /** 公司业务 */
  company = 2
}

/**
 * 提现状态
 */
export enum WithdrawDetailStatus {
  已消耗 = 0,
  已到账 = 1,
  转账失败
}

/**
 * 网点端充值状态
 */
export enum RechargeStatus {
  充值失败 = 0,
  充值成功 = 1,
}

/**
 * 客户端提现状态
 */
export enum WithdrawStatus {
  提现中 = 0,
  提现成功 = 1,
  提现失败 = 2,
  待定 = 3
}
/**
 * 红包类型
 */
export enum RedPacketType {
  /** 佣金 */
  Commission = 'commission',
  /** 红包 */
  RedPacket = 'redPacket',
}
