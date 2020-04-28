<template>
  <div class="red-receive-log">
    <div class="red-info">
      <div class="logo">
        <img :src="iconBankLogo" alt="">
      </div>
      <div class="name">
        {{detail.bank}}
      </div>
      <div class="sign">
        <div class="sign-item">有缘人可领</div>
        <div class="sign-item">3km可领</div>
      </div>
      <div class="red-status">
        <div class="money">
          <span class="num">{{detail.red.hasGedRed ? detail.red.selfInfo.money : '?.??'}}</span>
          <span>元</span>
        </div>
        <div class="status">{{detail.red.hasGedRed ? '已存入红包零钱' : '赶快去领吧'}}</div>
      </div>
    </div>
    <div class="receive-log">
      <div class="receive-amount">已领取{{detail.red.getCount}}份</div>
      <div class="receive-list">
        <card-red-receive v-for="(item, index) in detail.log" :key="index" :info="item" @user="jumpUser"></card-red-receive>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./red-receive-log.ts"></script>
<style lang="less">
  @import './red-receive-log.less';
</style>
