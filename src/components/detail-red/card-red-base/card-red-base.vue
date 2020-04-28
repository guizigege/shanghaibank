<template>
  <div class="card-red-base">
    <div class="item">红包金额<text class="num">{{ detail.sumMoney }}</text>元</div>
    <div class="item">红包个数<text class="num">{{ detail.sumCount }}</text>个</div>
    <div class="item">位置范围<text class="num">{{ range }}</text>内</div>
    <div class="item">发布时间<text class="num">{{ beginTime }}</text></div>
  </div>
</template>

<script lang="ts" src="./card-red-base.ts"></script>

<style lang="less" scoped>
.card-red-base {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px 30px;
  box-sizing: border-box;

  .item {
    height: 40px;
    line-height: 40px;

    .num {
      color: #ff3333;
      font-size: 16px;
      margin: 0 8px 0 30px;
    }
  }
}
</style>
