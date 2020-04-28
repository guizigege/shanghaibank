<template>
  <div class="withdraw">
    <div class="content">
      <div class="pay-item">
        <span>提现到微信：</span>
        <span>美美的小花</span>
      </div>
      <div class="pay-item pay-number">
        <span>提现金额</span>
        <i-input :value="money" placeholder="请输入提现金额" i-class="input" type="number" @input="inputMoney"/>
        <i class="sign">￥</i>
      </div>
      <div class="wx-balance">
        钱包余额：￥{{cash}}
      </div>

      <div class="btn-box">
        <button class="confirm" click="doWithdraw">确认提现</button>
      </div>

      <div class="tip">
        <div class="tip-title">提现说明</div>
        <div v-for="(tip, index) in withdrawTips" :key="index" class="tip-item">{{(index+1)}}、{{tip}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">

</script>
<style lang="less" scoped>
  @import './index.less';
</style>
<style lang="less">
  .withdraw .input {
    width: 170px;
    border: 1px solid #ddd;
    border-radius: 5px;
    vertical-align: middle;
    padding: 2px 30px;
    display: inline-block;
    &:hover {
      border: 1px solid #ccc;
    }
  }
</style>
