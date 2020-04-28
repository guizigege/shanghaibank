// 公告详情信息
export interface Announcement {
  noticeId: Number;
  isClient: Number;
  isOffice: Number;
  title: string;
  beginTime: Number;
  content: string;
}

// 可展示公告信息
export interface AnnouncementShow extends Announcement {
  formatTime: string;
}
