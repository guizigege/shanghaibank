<template>
  <div class="active-card" @click="navToAuditDetail">
    <div class="left">
      <img :src="iconRedPacket" alt="">
    </div>
    <div class="center">
      <div>红包金额<text>{{ redPacket.sumMoney }}</text>元</div>
      <div>红包数量<text>{{ redPacket.sumCount }}</text>个</div>
      <div>范围设置<text>{{ range }}</text>内</div>
      <div>发布时间<text>{{ beginTime }}</text></div>
    </div>
    <div class="right">
      <div>{{ timeAgo }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-red-packet-info.ts"></script>

<style lang="less" scoped>
  @import './card-red-packet-info.less';
</style>
