import {
  WithdrawDetailStatus,
  RedPacketType,
  RedPacketAuditState
} from './enums';

export interface RedPacket {
  money: string;
  amount: string;
  pink: string;
  date: string;
  time: string;
}

export const emptyRedPacket: RedPacket = {
  money: '',
  amount: '',
  pink: '',
  date: '',
  time: ''
};

export interface RedPacketDetail {
  type: RedPacketType;
  branch: string;
  createTime: number;
  head: string;
  money: number;
  office: string;
  packetId: string;
  productId: string;
  title: string;
}

export const emptyRedPacketDetail: RedPacketDetail = {
  type: RedPacketType.RedPacket,
  branch: '',
  createTime: 0,
  head: '',
  money: 0,
  office: '',
  packetId: '',
  productId: '',
  title: ''
};

export interface WithdrawItem {
  costId: string;
  createTime: number;
  totalFee: number;
  state: WithdrawDetailStatus;
  type: string;
}

export const emptyWithdrawItem: WithdrawItem = {
  costId: '',
  createTime: 0,
  totalFee: 0,
  state: WithdrawDetailStatus.已到账,
  type: RedPacketType.RedPacket
};

export interface AuditRedPacketCard {
  beginTime: number;
  updateTime: number;
  branch: string;
  endTime: number;
  getCount: number;
  getMoney: number;
  head: string;
  office: string;
  packetId: number;
  sumCount: number;
  sumMoney: number;
  user: string;
  userName: string;
  extendInfo: string;
}

export const emptyAuditRedPacketCard: AuditRedPacketCard = {
  beginTime: 0,
  updateTime: 0,
  branch: '',
  endTime: 0,
  getCount: 0,
  getMoney: 0,
  head: '',
  office: '',
  packetId: 0,
  sumCount: 0,
  sumMoney: 0,
  user: '',
  userName: '',
  extendInfo: '',
};

export interface PacketInfo {
  beginTime: number;
  branch: string;
  createTime: number;
  endTime: number;
  extendInfo: string;
  getCount: number;
  getMoney: number;
  head: string;
  managerUserId: string;
  office: string;
  opDesc: string;
  opTime: number;
  opUserId: number;
  packetId: number;
  status: RedPacketAuditState;
  sumCount: number;
  sumMoney: number;
  updateTime: number;
  userId: string;
}

export const emptyPacketInfo: PacketInfo = {
  beginTime: 0,
  branch: '',
  createTime: 0,
  endTime: 0,
  extendInfo: '',
  getCount: 0,
  getMoney: 0,
  head: '',
  managerUserId: '',
  office: '',
  opDesc: '',
  opTime: 0,
  opUserId: 0,
  packetId: 0,
  status: RedPacketAuditState.待审核,
  sumCount: 0,
  sumMoney: 0,
  updateTime: 0,
  userId: ''
};

export interface AuditRedPacketDetail {
  packet: PacketInfo;
  packetLog: Array<any>;
  packetPro: Array<{ productId: number }>;
}
