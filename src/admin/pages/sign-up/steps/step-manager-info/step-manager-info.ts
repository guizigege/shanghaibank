import { Vue, Component } from 'vue-property-decorator';
import store from '../../store';
import EnumValues from '@/utils/enum-values';
import Uploader from '@/components/uploader/uploader';
import { AppUrls } from '@/utils/consts';
import { Manager } from '@/models/manager';
import { Gender } from '@/models/enums';
import { $Toast } from '@/../static/iview/base/index';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { phoneNumber } from '@/utils/validator-rules';

const validations = {
  vm: {
    avatarUrl: { required },
    bigFrontCoverUrl: { required },
    frontCoverUrl: { required },
    name: { required, minLength: minLength(2) },
    signature: { required },
    desc: { required },
    gender: { required },
    businessType: { required },
    title: { required },
    tags: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(8),
      $each: {
        required
      }
    },
    mobilePhone: { required, phoneNumber },
    wxNumber: { required },
    highlights: { required },
    viewpoint: { required },
    life: { required },
    photoUrl: { required }
  }
};

@Component({
  components: { Uploader },
  validations
})
class StepManagerInfo extends Vue {
  AppUrls = AppUrls;

  isLoaded = false;

  vm: any = this.resetVm();

  gender = EnumValues.getNamesAndValues(Gender);

  time = '';

  index = 0;

  businessTypesIndex = 0;

  newTag = '';

  limit10: number = 10;
  limit25: number = 25;

  get businessTypes() {
    return store.state.businessTypes;
  }

  get validator() {
    return this.$v.vm;
  }

  onShow() {
    // 小程序 hook
  }

  mounted() {
    // vue hook
  }

  onLoad() {
    this.init();
  }

  onUnload() {
    this.vm = this.resetVm();
    this.isLoaded = false;
    this.$v.$reset();
  }

  onGenderChange(e?) {
    this.index = e ? +e.mp.detail.value : 0;
    this.vm.gender = +this.gender[this.index].value;
    this.$v.vm!['gender'].$touch();
  }

  onBusinessChange(e?) {
    this.businessTypesIndex = e ? +e.mp.detail.value : 0;
    this.vm.businessType = this.businessTypes[this.businessTypesIndex]['businessType'];
  }

  onNewTagChange(e) {
    this.newTag = e.mp.detail.detail.value;
  }

  onAddTag() {
    if (!this.newTag) {
      this.toast('请输入标签名称');
      return;
    }

    const exist = this.vm.tags.some(x => x === this.newTag);
    if (exist) {
      this.toast('已存在该标签');
      return;
    }

    this.$set(this.vm, 'tags', [...this.vm.tags, this.newTag]);
    this.newTag = '';
  }

  onRemoveTag(tag) {
    const index = this.vm.tags.findIndex(x => x === tag);
    if (index > -1) {
      const tags = this.vm.tags;
      tags.splice(index, 1);
      this.$set(this.vm, 'tags', [...tags]);
      this.$v.vm!['tags'].$touch();
    }
  }

  async onSubmit() {
    if (this.$v.$anyError) {
      this.toast('请输入完整的信息');
    } else {
      try {
        const result = await store.dispatch('onSubmit', { ...this.vm });
        if (result === 'success') {
          wx.redirectTo({
            url: AppUrls.AUDIT_RESULT
          });
        } else {
          throw Error('提交失败');
        }
      } catch (e) {
        this.toast(e);
      }
    }
  }

  onPrev() {
    store.commit('onPrev');
  }

  onAfterUploaded(fileId, target) {
    this.vm[target] = fileId;
  }

  private init() {
    wx.setNavigationBarTitle({ title: '完善信息' });
    if (store.state.signUpInfo.submitInfo['name']) {
      this.$set(this, 'vm', store.state.signUpInfo.submitInfo);
    } else {
      this.onGenderChange();
      this.onBusinessChange();
    }
    this.isLoaded = true;
  }

  private resetVm() {
    return {
      avatarUrl: '',
      bigFrontCoverUrl: '',
      frontCoverUrl: '',
      name: '',
      signature: '',
      desc: '',
      gender: Gender.女,
      businessType: '',
      title: '',
      tags: [],
      mobilePhone: '137',
      wxNumber: '',
      highlights: '',
      viewpoint: '',
      life: '',
      photoUrl: []
    };
  }

  private toast(content, type = 'error') {
    $Toast({
      content,
      type
    });
  }
}

export default StepManagerInfo;
