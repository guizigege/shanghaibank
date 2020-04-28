<template>
  <div class="card-red-packet-detail">
    <div class="content">

      <div class="top">
        <div class="name">{{ detail.title }}</div>
        <div class="money">
          <!--<span :class="{'green': detail.type==='commission', 'red': detail.type==='redPacket'}">{{ detail.money }}</span>-->
          <span class="red">{{ money }}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="office">{{ detail.office }}</div>
        <div class="date"><span>{{ dateTime }}</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-red-packet-detail.ts"></script>

<style lang="less" scoped>
  @import './card-red-packet-detail.less';
</style>
