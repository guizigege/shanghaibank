import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import service from '@/api/service/admin';
import { isValidJSON, getImageUrl, debounce } from '@/utils';
import { $Toast } from 'static/iview/base';
import { strSeparator, maxFileSize } from '@/utils/consts';

const debug = require('@/utils/debug')('log:Component/Uploader');

@Component
class Uploader extends Vue {
  @Prop({ default: 1 }) maxFilesLength;

  @Prop({ default: '' }) urls: string;

  files: Array<string> = [];

  selectedFile = -1;

  visible = false;

  uploading = false;

  onUpload = debounce(this.onChooseImage, 300);

  onReady() {
    //
  }

  onShow() {
    //
  }

  onHide() {
    // 【注】不能在该事件中做重置数据操作，因为在相冊选择图片时，会触发 App 级别的 onHide 事件，会导致不可预期的结果
  }

  onLoad() {
    // watch 无效，使用 onLoad 与 onUnload 手动控制
    this.urlsChanged();
  }

  onUnload() {
    this.resetData();
  }

  @Emit('uploaded')
  onAfterUploaded(params) {
    return params;
  }

  onChooseImage() {
    if (this.uploading) {
      return;
    }

    wx.chooseImage({
      count: this.maxFilesLength || 0,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: this.upload,
      fail: function() {
        //
      },
      complete: function() {
        // console.log('commplete');
      }
    });
  }

  onPreview(current) {
    wx.previewImage({
      current,
      urls: this.files
    });
  }

  onLongPress(index) {
    console.log('onLongPress');
    this.selectedFile = index;
    this.visible = true;
  }

  onRemove() {
    this.$emit('remove', this.selectedFile);
    this.files.splice(this.selectedFile, 1);
    this.resetSelected();
  }

  onCancel() {
    this.resetSelected();
  }

  private urlsChanged() {
    if (~this.urls.length) {
      const index = this.urls.indexOf(strSeparator);
      const list = ~index
        ? this.urls.split(strSeparator)
        : [].concat(this.urls as any);

      list
        .filter(x => x)
        .map(url => {
          const file = getImageUrl(url);
          this.files.push(`${file}`);
        });
    }
  }

  private resetSelected() {
    this.selectedFile = -1;
    this.visible = false;
  }

  private upload(filesInfo: wx.TempFilesData) {
    const { tempFilePaths, tempFiles } = filesInfo;
    if (tempFilePaths.length > this.maxFilesLength) {
      $Toast({
        content: `图片最多只能选择 ${this.maxFilesLength} 张`,
        type: 'warning'
      });
      return;
    }

    if ([].concat(tempFiles as any).some(x => x['size'] > maxFileSize)) {
      const mb = maxFileSize / 1024 / 1024;
      $Toast({
        content: `图片大小不能超过 ${mb} M`,
        type: 'warning'
      });
      return;
    }

    this.uploading = true;
    service
      .uploadFile(tempFilePaths.toString())
      .then(res => {
        if (isValidJSON(`${res.toString()}`)) {
          const params = JSON.parse(`${res}`);
          const { fileId } = params['data'];
          this.files.push(getImageUrl(fileId));
          this.onAfterUploaded(fileId);
        } else {
          throw new Error();
        }
        this.uploading = false;
      })
      .catch(() => {
        this.uploading = false;
        $Toast({
          content: '上传文件失败',
          type: 'error'
        });
      });
  }

  private resetData() {
    this.files = [];
    this.urls = '';
  }
}

export default Uploader;
