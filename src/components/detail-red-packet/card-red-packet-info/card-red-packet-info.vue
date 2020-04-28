<template>
  <div class="red-envelope">
    <div class="red-envelope-content">
      <div class="left">
        <div class="money">
          <div>
            金额：<span class="amount">{{sumMoney}}</span>
          </div>
          <div v-if="type==='cash'" class="balance">
            余额：{{cash}}
          </div>
        </div>
        <div class="count">
          <span>数量：{{redPacket.sumCount}}</span><span>已领：{{redPacket.getCount}}</span>
        </div>
        <div class="date">
          <span>{{createTime}}</span>
        </div>
      </div>
      <div class="right">
        <div class="arrow" v-if="type==='arrow'" @click="toDetail"> > </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" src="./card-red-packet-info.ts"></script>

<style lang="less" scoped>
  @import './card-red-packet-info.less';
</style>
