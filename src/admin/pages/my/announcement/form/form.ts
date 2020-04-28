import { Component } from 'vue-property-decorator';
import { Announcement } from '@/models/announcement';
import { required, maxLength } from 'vuelidate/lib/validators';
import { EAnnouncement } from '@/models/enums';
import store from '../store';
import DateTimePicker from '@/components/date-time-picker/date-time-picker';
import { mixins } from 'vue-class-component';
import FormMixin from '@/utils/form-mixins';
import { $Toast } from 'static/iview/base';
import storage from '@/utils/storage';
import { formatTime, handleError } from '@/utils';

interface AnnouncementVm extends Announcement {
  time: string;
  date: string;
}

const validations = {
  vm: {
    noticeId: {},
    isClient: { required },
    isOffice: { required },
    title: { required, maxLength: maxLength(EAnnouncement.TitleMaxLength) },
    beginTime: { required },
    content: { required, maxLength: maxLength(EAnnouncement.ContentMaxLength) },

    time: { required },
    date: { required }
  }
};

@Component({
  components: { DateTimePicker },
  validations
})
class Form extends mixins(FormMixin) {
  vm = {
    noticeId: 0,
    isOffice: 0,
    isClient: 1,
    title: '',
    content: '',
    beginTime: 0,

    time: '',
    date: ''
  } as AnnouncementVm;
  now = '';
  titleMaxLength = EAnnouncement.TitleMaxLength;
  contentMaxLength = EAnnouncement.ContentMaxLength;
  checkboxValues = [
    {
      id: 1,
      value: '客户',
      func: () => {
        this.vm.isClient = (1 + this.vm.isClient.valueOf()) % 2;
      }
    },
    {
      id: 2,
      value: '支行网点',
      func: () => {
        this.vm.isOffice = (1 + this.vm.isOffice.valueOf()) % 2;
      }
    }
  ];
  currentCheckbox: String[] = [];
  checkboxMap = {};

  isNew: boolean = true;

  get validator() {
    return this.$v.vm;
  }

  get canCommit() {
    return !this.$v.$invalid;
  }

  onLoad() {
    this.init();
  }

  onShow() {
    let noticeDetail = storage.get('noticeDetail');
    if (noticeDetail) {
      wx.setNavigationBarTitle({ title: '编辑公告' });
      this.isNew = false;
      const d = formatTime(noticeDetail.beginTime);
      noticeDetail.date = d.substring(0, d.indexOf(' ') + 1).trim();
      noticeDetail.time = d.substring(d.indexOf(' ')).trim();
      Object.assign(this.vm, noticeDetail);
      this.initCheckbox();
    }
  }

  onUnload() {
    this.vm = {
      noticeId: 0,
      isOffice: 0,
      isClient: 1,
      title: '',
      content: '',
      beginTime: 0,
      time: '',
      date: ''
    };
    this.currentCheckbox = [];
    this.checkboxMap = {};
    this.isNew = true;
    storage.remove('noticeDetail');
  }

  onCheckboxChange(e) {
    const choose = e.target.value;
    const index = this.currentCheckbox.indexOf(choose);
    if (index === -1) {
      this.currentCheckbox.push(choose);
    } else {
      if (this.currentCheckbox.length === 1) return;
      this.currentCheckbox.splice(index, 1);
    }
    this.checkboxMap[choose].func();
  }

  async onEdit() {
    const data: Announcement = { ...this.vm };
    data.beginTime = +this.getDateStamp(this.vm.date, this.vm.time);
    await store.dispatch('editAnnouncement', data)
      .then(() => {
        $Toast({
          content: '已修改'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      })
      .catch(handleError);
  }

  async onSubmit() {
    if (!this.canCommit) {
      return;
    }

    if (!this.isNew) {
      await this.onEdit();
      return;
    }

    const data: Announcement = { ...this.vm };
    data.beginTime = +this.getDateStamp(this.vm.date, this.vm.time);
    await store.dispatch('addAnnouncement', data)
      .then(() => {
        $Toast({
          content: '已添加'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      })
      .catch(handleError);
  }

  initCheckbox() {
    this.checkboxValues.forEach(item => {
      this.checkboxMap[item.value] = item;
    });
    if (this.vm.isClient === 1) {
      this.currentCheckbox.push('客户');
    }
    if (this.vm.isOffice === 1) {
      this.currentCheckbox.push('支行网点');
    }
  }

  private init() {
    wx.setNavigationBarTitle({ title: '新增公告' });
    this.vm.time = this.getDateTime('', 'time');
    this.vm.date = this.getDateTime('', 'date');
    this.initCheckbox();
  }
}

export default Form;
