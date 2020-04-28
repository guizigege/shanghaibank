const config = {
  redStart: 0.1,  // 红包起发金额
  validDay: 3,  // 红包发布后有效天数
  dayNum: 3,    // 发布时间可选择的天数
  ageRange: {   // 年龄选择范围
    start: {
      min: 12,
      max: 15
    },
    end: {
      min: 30,
      max: 100
    }
  },
  limitHk: 2, // 最多可选的精准获客项目
  // minSingleRed: 0.1, // 领取的单个红包最小金额限制
  limitHobby: 2
};
export default config;
