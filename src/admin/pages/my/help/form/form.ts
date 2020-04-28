import { Component } from 'vue-property-decorator';
import { required, maxLength } from 'vuelidate/lib/validators';
import { EAnnouncement } from '@/models/enums';
import store from '../store';
import DateTimePicker from '@/components/date-time-picker/date-time-picker';
import { mixins } from 'vue-class-component';
import FormMixin from '@/utils/form-mixins';
import { $Toast } from 'static/iview/base';
import storage from '@/utils/storage';
import { formatTime, handleError } from '@/utils';

const validations = {
  vm: {
    noticeId: {},
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
    title: '',
    content: '',
    beginTime: 0,
    time: '',
    date: ''
  };
  now = '';
  titleMaxLength = EAnnouncement.TitleMaxLength;
  contentMaxLength = EAnnouncement.ContentMaxLength;

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
    let helpDetail = storage.get('helpDetail');
    if (helpDetail) {
      wx.setNavigationBarTitle({ title: '编辑帮助' });
      this.isNew = false;
      const d = formatTime(helpDetail.beginTime);
      helpDetail.date = d.substring(0, d.indexOf(' ') + 1).trim();
      helpDetail.time = d.substring(d.indexOf(' ')).trim();
      Object.assign(this.vm, helpDetail);
    }
  }

  onUnload() {
    this.vm = {
      noticeId: 0,
      title: '',
      content: '',
      beginTime: 0,
      time: '',
      date: ''
    };
    this.isNew = true;
    storage.remove('helpDetail');
  }

  async onEdit() {
    const data = { ...this.vm };
    data.beginTime = +this.getDateStamp(this.vm.date, this.vm.time);
    await store.dispatch('editHelp', data)
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

    const data = { ...this.vm };
    data.beginTime = +this.getDateStamp(this.vm.date, this.vm.time);
    await store.dispatch('addHelp', data)
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

  init() {
    wx.setNavigationBarTitle({ title: '新增帮助' });
    this.vm.time = this.getDateTime('', 'time');
    this.vm.date = this.getDateTime('', 'date');
  }
}

export default Form;
