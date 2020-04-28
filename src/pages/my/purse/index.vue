<template>
  <div class="content">
    <div class="header">
      <i-icon class="i-icon" type="financial_fill" size="28"/>
      <span class="sub-title">我的零钱</span>
      <span class="money">{{ myCash }} 元</span>

      <button class="btn" @click="toWithdraw">提现</button>


    </div>
    <i-cell-group class="cell-group">
      <i-cell title="红包收益" is-link="true" :url="AppUrls.CLIENT_MY_PURSE_RED_PACKET_DETAIL">
        <i-icon slot="icon" class="icon-menu" type="redpacket" size="26"/>
      </i-cell>
      <i-cell title="佣金红包" is-link :url="AppUrls.CLIENT_MY_PURSE_COMMISSION_DETAIL">
        <i-icon slot="icon" class="icon-menu" type="interactive" size="26"/>
      </i-cell>
      <i-cell title="提现明细" is-link :url="AppUrls.CLIENT_MY_PURSE_WITH_DRAW_DETAIL">
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
    margin: 20rpx;
  }
  .sub-title {
    margin-bottom: 10rpx;
    font-size: 13px;
  }
  .money {
    font-size: 15px;
  }
  button{
    width: 130rpx;
    height: 60rpx;
    border: 1rpx solid #fff;
    margin: 20rpx 0;
    line-height: 60rpx;
    background: none;
    font-size: 15px;
    color: #fff;
  }

}
</style>

