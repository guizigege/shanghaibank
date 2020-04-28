import { Vue, Component, Watch } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import service from '@/api/service/admin';
import ListItem from '@/components/list/list-item/list-item';
import ListCard from '@/components/list/list-card/list-card';
import Tip from '@/components/tip/tip';
import { checkMoney, formatMoney, formatPayMoney, formatThousandMoney, } from '@/utils/index';
import {
  getDateTimeInfo,
  formatNumber,
  isValidJSON
} from '@/utils/index.ts';
import config from './config';

@Component({
  components: {
    ListItem,
    ListCard,
    Tip
  }
})
class Index extends Vue {
  AppUrls = AppUrls;
  redAvg: any = null; // 红包均额
  pushTime: number = 0; // 发布红包的日期
  showHk = false; // 是否精准获客
  cash: any = 0;
  // 设置选项
  options = {
    vision: [
      {
        name: '所有人可见'
      },
      {
        name: '粉丝'
      },
      {
        name: '已关注客户'
      },
      {
        name: '取消'
      }
    ],
    sex: [
      {
        id: 0,
        value: '男'
      },
      {
        id: 1,
        value: '女'
      },
      {
        id: 2,
        value: '取消'
      }
    ],
    marry: [
      {
        id: 0,
        value: '未婚'
      },
      {
        id: 1,
        value: '已婚'
      },
      {
        id: 2,
        value: '取消'
      }
    ],
    system: [
      {
        id: 0,
        value: '苹果ios'
      },
      {
        id: 1,
        value: '安卓系统'
      },
      {
        id: 2,
        value: '取消'
      }
    ]
  };
  // 选择弹出框的显示与否
  showSelect = {
    vision: false,
    sex: false,
    marry: false,
    system: false,
    pay: false
  };
  ageArrayIndex = [0, 0, 0, 0];
  timeArrayIndex = [0, 0, 0];
  // 各项显示的文本信息
  selectText = {
    redMoney: '计算后显示',
    redNum: '计算后显示',
    range: '所选区域用户可见',
    time: '所选时间点后可见',
    vision: '请选择可见客户',
    age: '请选择年龄',
    sex: '请选择性别',
    marry: '请选择婚姻',
    hobby: '请选择兴趣',
    system: '请选择系统',
    pay: '余额支付'
  };
  // 条件判断
  tips = {
    hasRedAvg: true,
    hasNum: true,
    hasArea: false,
    hasTime: true,
    hasNumberLimit: false,
  };
  businessList: any = []; // 业务列表

  config = config;

  moneyPlaceholder = `${config.redStart}元起发`;

  redAvgTip = `${config.redStart}元起发`;

  tip = '';
  timmer:any = null;
  showTip = false;
  private toast(tip,duration = 1500) {
    this.tip = tip;
    if(this.showTip){
      this.showTip = false;
      if (this.timmer) clearTimeout(this.timmer);
      return console.log("双击取消定时器");
    }
    this.showTip = true;
    this.timmer = setTimeout(()=>{
      this.showTip = false;
    },duration)
  }
  @Watch('config.redStart')
  redStartChanged() {
    this.redAvgTip = `起发金额不能小于${config.redStart}`;
    this.moneyPlaceholder = `${config.redStart}元起发`;
  }
  // 年龄的设置范围
  get ageArray() {
    return [
      ['下限'],
      this.setArray(config.ageRange.start.min, config.ageRange.start.max),
      this.setArray(config.ageRange.end.min, config.ageRange.end.max),
      ['上限']
    ];
  }
  // 日期的设置范围
  get dateTime() {
    return ['今天'].concat(this.dayNumber(config.dayNum));
  }
  get timeArray() {
    return [
      this.dateTime,
      this.setArray(0, 23, true),
      this.setArray(0, 59, true)
    ];
  }
  // 按钮是否可以触发的状态
  get isSend() {
    return (
      this.checkRequire &&
      this.checkRedAvgFormat &&
      this.checkRedAvgMoney &&
      this.checkTime &&
      this.checkJZHK
    );
  }
  // 传给后台的额外信息
  get condition() {
    let ex = {
      range: this.selectText.range,
      time: this.selectText.time,
      vision: this.selectText.vision,
      age: this.selectText.age,
      sex: this.selectText.sex,
      marry: this.selectText.marry,
      hobby: this.selectText.hobby,
      system: this.selectText.system,
      pay: this.selectText.pay
    };
    let product = {
      products: this.businessList.filter(
        value => value.limitNum && Number(value.limitNum) !== 0
      )
    };
    for (let i in ex) {
      ex[i] = this.hasSelect(ex[i]);
    }
    return { ...ex, ...product };
  }
  get validTime() {
    return this.pushTime + 86400 * 1000 * config.validDay;
  }
  // 红包总金额
  get payMoney() {
    if(!this.redAvg||!this.redNum){
      return 0;
    } else {
      let money = ((Number(this.redAvg)*(this.redNum*100))/100).toString();
      return formatPayMoney(money);
    }

  }
  // 红包总数
  get redNum() {
    return this.businessList.reduce((pre,cur)=>{
      return pre+(Number(cur.limitNum)?Number(cur.limitNum):0)
    },0)
  }
  // 判断选择的时间是否晚于当前时间
  get checkTime() {
    if (this.hasSelect(this.selectText.time)) {
      let now = new Date().getTime();
      if (this.pushTime < now) {
        this.tips.hasTime = false;
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  // 判断精准获客最多选两项
  get checkJZHK() {
    let count = 0;
    let arr = [
      this.selectText.vision,
      this.selectText.age,
      this.selectText.sex,
      this.selectText.marry,
      this.selectText.hobby,
      this.selectText.system
    ];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      if (this.hasSelect(arr[i])) {
        count++;
      }
    }
    return count < config.limitHk+1;
  }
  // 判断带*项是否漏空
  get checkRequire() {
    return this.redAvg && this.tips.hasArea && this.tips.hasNumberLimit;
  }
  // 判断起发金额是否大于等于规定的金额
  get checkRedAvgMoney() {
    return this.redAvg >= config.redStart;
  }
  // 判断红包均额格式设置是否合法
  get checkRedAvgFormat() {
    return checkMoney(this.redAvg);
  }

  private hasSelect(val) {
    return !/选/.test(val) ? val : null;
  }
  private setArray(min = 0, max = 0, format = false) {
    let arr = [];
    for (let i = min; i <= max; i++) {
      if (format) {
        // @ts-ignore
        arr.push(formatNumber(i));
      } else {
        // @ts-ignore
        arr.push(i);
      }
    }
    return arr;
  }
  private dayNumber(n) {
    let arr = [] as any;
    for (let i = 0; i < n; n--) {
      let date = getDateTimeInfo(new Date().getTime() + 86400 * 1000 * n);
      let day = formatNumber(date.day);
      let month = formatNumber(date.month);
      let year = date.year;
      arr.push(`${year}/${month}/${day}`);
    }
    return arr.reverse();
  }
  private showLimit(title) {
    wx.showToast({
      title: title,
      duration: 1000,
      icon: 'loading'
    });
  }


  // 点击页面各项目触发的选择操作
  selectArea() {
    wx.redirectTo({
      url: AppUrls.ADMIN_HOME_RED_PACKETS_AREA
    });
  }
  selectVision() {
    this.showSelect.vision = true;
  }
  selectSex() {
    this.showSelect.sex = true;
  }
  selectMarry() {
    this.showSelect.marry = true;
  }
  selectHobby() {
    wx.redirectTo({
      url: AppUrls.ADMIN_HOME_RED_PACKETS_HOBBY
    });
  }
  selectSystem() {
    this.showSelect.system = true;
  }
  selectPay() {
    if (!this.checkRequire) {
      this.toast('带*项为必填项，不能留空');
    } else {
      if (!this.checkRedAvgFormat) {
        this.toast('红包均额格式错误(最多保留两位小数)');
      } else {
        if (!this.checkRedAvgMoney) {
          this.toast(`红包均额不能小于${config.redStart}元`);
        }
      }
    }
    if (!this.checkTime) {
      this.toast(`红包发布时间不能早于当前时间`);
    }
    if (!this.checkJZHK) {
      this.toast(`精准获客最多选择${config.limitHk}项`);
    }
    if (this.isSend) {
      this.getCash();//重新获取余额
      this.showSelect.pay = true;
    } else {
      this.showSelect.pay = false;
    }
    // 所有条件满足时则触发启动支付的按钮
  }
  // 选择中后触发
  handleSelectTime(e) {
    this.selectText.time = `${this.timeArray[0][e.mp.detail.value[0]]}  ${
      this.timeArray[1][e.mp.detail.value[1]]
    }:${this.timeArray[2][e.mp.detail.value[2]]}`;
    let arr1;
    let arr2;
    let today;
    let date;
    let time;
    arr1 = this.selectText.time.split('  ');
    time = arr1[1];
    if (arr1[0] === '今天') {
      today = getDateTimeInfo(new Date().getTime());
      date =
        formatNumber(today.month) +
        ' ' +
        formatNumber(today.day) +
        ',' +
        today.year;
    } else {
      arr2 = arr1[0].split('/');
      date = arr2[1] + ' ' + arr2[2] + ',' + arr2[0];
    }
    this.pushTime = new Date(date + ' ' + time).getTime();
  }
  handleSelectVision(e) {
    if (this.options.vision[e.mp.detail.index].name === '取消') {
      this.selectText.vision = '请选择可见客户';
    } else {
      this.selectText.vision = this.options.vision[e.mp.detail.index].name;
    }
    this.showSelect.vision = false;
  }
  handleSelectAge(e) {
    this.selectText.age = `${this.ageArray[1][e.mp.detail.value[1]]}~${
      this.ageArray[2][e.mp.detail.value[2]]
    }`;
  }
  cancelSelectAge() {
    this.selectText.age = '请选择年龄';
  }
  handleSelectSex(e) {
    if (e.mp.detail.value === '取消') {
      this.selectText.sex = '请选择性别';
    } else {
      this.selectText.sex = e.mp.detail.value;
    }
    this.showSelect.sex = false;
  }
  handleSelectMarry(e) {
    if (e.mp.detail.value === '取消') {
      this.selectText.marry = '请选择婚姻';
    } else {
      this.selectText.marry = e.mp.detail.value;
    }
    this.showSelect.marry = false;
  }
  handleSelectSystem(e) {
    if (e.mp.detail.value === '取消') {
      this.selectText.system = '请选择系统';
    } else {
      this.selectText.system = e.mp.detail.value;
    }
    this.showSelect.system = false;
  }
  handleSelectPay(e) {
    this.selectText.pay = e.mp.detail.value;
  }
  handleCancelPay() {
    this.selectText.pay = '余额支付';
    this.showSelect.pay = false;
  }
  handlePay() {
    if (this.selectText.pay === '微信支付') {
      let _this = this;
      try {
        service.recharge({
          desc: '微信支付，充值',
          // totalFee: _this.payMoney * 100,  // 人民币元转换为分
          totalFee: 1  // to do: 移除测试代码，使用上一行代码
        }).then(data=>{
          const { timeStamp, nonceStr, signType, paySign } = data;
          const successFn = () => {
            _this.showLimit('支付成功！');
            _this.addRedPacket();
          };
          wx.requestPayment({
            timeStamp,
            nonceStr,
            package: data.package,
            signType,
            paySign,
            success: successFn,
            fail(res) {
              console.error('支付失败 :', res);
            }
          });
        });
      } catch (err) {
        wx.showToast({
          title: err || '支付失败',
          icon: 'loading'
        });
      }
      this.showSelect.pay = false;
    } else {

      if (Number(formatThousandMoney(this.cash))*100<Number(this.payMoney)*100) {
        this.showLimit('余额不足...');
      } else {
        this.addRedPacket();
        this.showSelect.pay = false;
      }
    }
  }
  addRedPacket() {
    this.showLimit('塞红包中...');
    let productIds = [] as any;
    this.businessList
      .filter(value => value.limitNum && Number(value.limitNum) !== 0)
      .map(value => productIds.push(value.productId));
    // 调用添加红包接口
    service
      .addRedPacket({
        productIds,
        totalMoney: Number(this.payMoney),
        num: Number(this.redNum),
        rangeStart: Number(this.redAvg),
        rangeEnd: Number(this.redAvg),
        beginTime:
          this.pushTime === 0 ? new Date().getTime() : this.pushTime,
        endTime: this.validTime,
        condition: JSON.stringify(this.condition)
      })
      .then(res => {
        wx.hideToast();
        this.showLimit('塞红包成功！');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }


  // 输入框条件的判断
  inputRedAvg(e) {
    this.redAvg = e.mp.detail.value;
    if(!this.redAvg){
      this.tips.hasRedAvg = false;
    }else{
      if(checkMoney(this.redAvg)){
        this.tips.hasRedAvg = true;
        if(this.redAvg >= config.redStart){
          this.tips.hasRedAvg = true;
        }else{
          this.redAvgTip = `${config.redStart}起发`;
          this.tips.hasRedAvg = false;
        }
      }else{
        this.redAvgTip = '请输入正确的红包均额';
        this.tips.hasRedAvg = false;
      }
    }
    // !this.redAvg
    //   ? (this.tips.hasRedAvg = false)
    //   : (this.tips.hasRedAvg = this.redAvg >= config.redStart);
    if(checkMoney(this.redAvg)){
      if(this.redNum){
        this.selectText.redMoney = formatPayMoney(this.payMoney);
      }
    }else{
      this.selectText.redMoney = '0.00'
    }
  }
  blurRedAvg() {
    // 失去焦点时，符合金额格式则补全
    if(checkMoney(this.redAvg)){
      if(this.redAvg==='0.'){
        this.redAvg = '0.00';
      }
      this.redAvg = formatPayMoney(this.redAvg);
    }
  }


  inputNumberLimit(e) {
    let index = e.mp.currentTarget.dataset.comkey.split('-')[1];
    this.businessList[index].limitNum = e.mp.detail.value;
    //限制产品发出的红包不能为浮点数
    this.businessList[index].limitNum = this.businessList[index].limitNum.replace(/\.+/g,'');
    //判断是否至少选填一项产品且数量不为0
    this.tips.hasNumberLimit = this.businessList.some(
      value => value.limitNum && value.limitNum !== 0
    );
    //获取红包总额和总数量
    this.selectText.redNum = this.redNum;
    this.selectText.redMoney = this.payMoney?(isNaN(Number(this.payMoney))?'0.00':this.payMoney):'0.00';
  }
  blurNumberLimit(e) {
    let index = e.mp.currentTarget.dataset.comkey.split('-')[1];
    //失去焦点时，存在limitNum,则去除其前面的所有0
    if(Number(this.businessList[index].limitNum)){
      this.businessList[index].limitNum = this.businessList[index].limitNum.replace(/^0*/,'');
    }else{
      this.businessList[index].limitNum = 0;
    }
    //判断是否至少选填一项产品且数量不为0
    this.tips.hasNumberLimit = this.businessList.some(
      value => value.limitNum && value.limitNum !== 0
    );
  }

  // 获取业务列表
  async getBusinessList() {
    let res = await service.getOfficeProductList(2);
    res.forEach(value => (value.limitNum = null));
    this.businessList = res;
  }
  getCash() {
    service
      .myCash()
      .then(res => {
        this.cash = formatMoney(res);
      })
      .catch(err => console.log(err));
  }
  getBranchRedCondition() {
    service.getRed().then(res => {
      if (res && res.condition && isValidJSON(res.condition)) {
        const branchRedCondition = JSON.parse(res.condition);
        // to do: 赋值给本地配置
        config.redStart = branchRedCondition.money;
      }
    }).catch(err=>console.log(err));
  }
  onLoad(options) {
    this.getBranchRedCondition();
    this.getCash();
    if (this.businessList.length === 0) {
      this.getBusinessList().catch(err => console.log(err));
    }
    // 获取设置的兴趣
    if (options.hobby) {
      this.selectText.hobby = options.hobby;
    }
    // 获取设置的范围
    if (options.range) {
      this.selectText.range = options.range;
      this.tips.hasArea = true;
    }
  }
}

export default Index;
