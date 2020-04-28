<!-- 红包领取记录卡片 -->
<template>
  <div class="examine" @click="onClick">
    <div @click="userDetail" class="item-warp">
      <div class="item-icon">
        <img :src="info.realIcon" alt="">
      </div>
      <div class="item-right">
        <div class="name">{{info.userName}}</div>
        <div class="time">{{info.releaseTime}}</div>
      </div>
      <div class="item-ft">￥{{info.money}}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-red-receive.ts">
</script>

<style lang="less" scoped>
  @import './card-red-receive.less';
</style>
