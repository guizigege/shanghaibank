<!-- 银行信息卡片 -->
<template>
  <div
    class="branch-msg"
    @click="onClick">
    <div class="branch-left">
      <img :src="avatar" alt="">
    </div>
    <div class="branch-right">
      <p class="branch_top_text">
        <span>{{ bank.bankName }}</span>
        <span>{{ timeAgo }}</span>
      </p>
      <p>
        <img src="../../../static/images/icon_local.png" alt="">
        <span class="address">{{ bank.location.address }}</span>
      </p>
      <p>
        <span>营业时间：</span>
        <span>{{ bank.weekdayAmStartHour }} ~ {{ bank.weekdayAmEndHour }}</span>
        <span style="padding-left: 10px;">{{ bank.weekdayPmStartHour }} ~ {{ bank.weekdayPmEndHour }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./card-bank-info.ts"></script>

<style lang="less" src="./card-bank-info.less"></style>
