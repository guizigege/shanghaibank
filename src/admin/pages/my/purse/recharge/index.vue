<template>
  <div class="recharge">
    <div class="content">
      <div class="pay-item">
        <span>付款方式</span>
        <img :src="iconWeChat" alt>
        <span>微信钱包</span>
      </div>
      <div class="pay-item pay-number">
        <span>充值金额</span>
        <input :value="money" placeholder="请输入充值金额" class="input" type="number" @input="inputMoney" />
        <i class="sign">￥</i>
      </div>
      <div class="wx-balance">
         余额：￥{{cash}}
      </div>
      <div class="btn-box">
        <button class="confirm" @click="doRecharge">确认充值</button>
      </div>
      <div class="tip">
        <div class="tip-title">充值说明</div>
        <div v-for="(tip, index) in rechargeTips" :key="index" class="tip-item">{{(index+1)}}、{{tip}}</div>
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
  .recharge .input {
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
