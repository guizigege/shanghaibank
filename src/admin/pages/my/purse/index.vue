<template>
  <div class="content">
    <div class="header">
      <i-icon class="i-icon" type="financial_fill" size="28"/>
      <span class="sub-title">我的零钱</span>
      <span class="money">{{cash}}元</span>
      <div class="btn-group">
        <button class="btn" @click="toRecharge">充值</button>
        <button class="btn" @click="toWithdraw" disabled="true">提现</button>
      </div>

    </div>
    <i-cell-group class="cell-group">
      <i-cell title="红包发放" is-link="true" :url="AppUrls.ADMIN_MY_PURSE_RED_PACKET">
        <i-icon slot="icon" class="icon-menu" type="redpacket" size="26"/>
      </i-cell>
      <i-cell title="钱包明细" is-link :url="AppUrls.ADMIN_MY_PURSE_WALLET">
        <i-icon slot="icon" class="icon-menu" type="interactive" size="26"/>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:0 0 15px 0;
    background-color: #ff3333;
    color: #fff;
    .i-icon {
      margin: 10px;
    }
    .sub-title {
      margin-bottom: 5px;
      font-size: 13px;
    }
    .money {
      font-size: 15px;
    }
    .btn-group{
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      button{
        width: 65px;
        height: 30px;
        line-height: 30px;
        border: 1rpx solid #fff;
        margin: 10px 0;
        background: none;
        font-size: 15px;
        color: #fff;
        &:last-child {
          margin-left: 20px;
          border: 1rpx solid #bbb;
          color: #bbb;
        }
      }

    }

  }
</style>
