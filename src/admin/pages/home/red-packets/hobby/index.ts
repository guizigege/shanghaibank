import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';
import config from '../config';
@Component
class Index extends Vue {
  AppUrls = AppUrls;
  myHobby: Array<number> = [];
  hobbyText: Array<string> = [];
  hobby = [
    {
      id: 0,
      name: '旅行',
      url: '/static/images/hobby_1.png',
      selected: false
    },
    {
      id: 1,
      name: '书籍',
      url: '/static/images/hobby_2.png',
      selected: false
    },
    {
      id: 2,
      name: '游戏',
      url: '/static/images/hobby_3.png',
      selected: false
    },
    {
      id: 3,
      name: '美食',
      url: '/static/images/hobby_4.png',
      selected: false
    },
    {
      id: 4,
      name: '运动',
      url: '/static/images/hobby_5.png',
      selected: false
    },
    {
      id: 5,
      name: '影视',
      url: '/static/images/hobby_6.png',
      selected: false
    },
    {
      id: 6,
      name: '购物',
      url: '/static/images/hobby_7.png',
      selected: false
    },
    {
      id: 7,
      name: '音乐',
      url: '/static/images/hobby_8.png',
      selected: false
    }
  ]; // 兴趣爱好列表

  // 按钮确定操作
  confirm() {
    wx.redirectTo({
      url: `${this.AppUrls.ADMIN_HOME_RED_PACKETS}?hobby=${this.hobbyText.join(
        '，'
      )}`
    });
  }
  // 按钮取消操作
  cancel() {
    this.hobbyText = [];
    this.myHobby = [];
    for(let i=0;i<this.hobby.length;i++) {
      this.hobby[i].selected = false;
    }
    wx.redirectTo({
      url: `${this.AppUrls.ADMIN_HOME_RED_PACKETS}?hobby=请选择兴趣`
    });
  }
  // 选择的兴趣爱好
  doSelect(index) {
    let push = true;
    this.hobby.forEach(value => {
      value.selected = false;
    });
    this.myHobby.forEach(value => {
      if (value === index) {
        this.myHobby.splice(this.myHobby.indexOf(value), 1);
        push = false;
      }
    });
    if (push) {
      if (this.myHobby.length < config.limitHobby) {
        this.myHobby.push(index);
      } else {
        this.myHobby.splice(1, 1, index);
      }
    }
    this.hobbyText = [];
    this.myHobby.forEach(value => {
      this.hobbyText.push(`${this.hobby[value].name}`);
    });
    console.log('text', this.hobbyText);
    this.myHobby.map(value => {
      this.hobby[value].selected = value === this.hobby[value].id;
    });
  }
}
export default Index;
