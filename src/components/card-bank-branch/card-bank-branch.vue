<template>
  <div class="card-branch-msg" @click="onClick">
    <div class="card-top">
      <div class="card-branch-left">
        <img :src="bank.realIcon" alt="">
      </div>
      <div class="card-branch-right">
        <p class="branch_top_text">
          <span>{{ bank.office }}</span>
          <span>{{ bank.dist }} km</span>
        </p>
        <ul class="bank-desc">
          <li>{{ bank.desc }}</li>
        </ul>
        <div class="word-time">
          <div>
            <span>工作日：</span>
            <span>{{ bank.weekdayAmStartHour }} ~ {{ bank.weekdayPmEndHour }}</span>
          </div>
          <div>
            <span>节假日：</span>
            <span>{{ bank.holidayAmStartHour }} ~ {{ bank.holidayPmEndHour }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-bottom">
      <i-rate size="16" :value="bank.star"></i-rate>
      <div class="connect-bank">
        <contacts
          :wxNumber="bank.wxNumber"
          :location="bank.location"
          :mobile="bank.mobile"></contacts>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-bank-branch.ts">
</script>

<style lang="less" scoped>
  @import './card-bank-branch.less';
</style>
