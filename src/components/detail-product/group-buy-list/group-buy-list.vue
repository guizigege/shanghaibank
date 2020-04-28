<template>
  <div class="group-wrap">
    <div class="group-buy-list" v-for="(item, index) in list" :key="item">
      <div class="group-buy-img">
        <img :src="item.realIcon" alt="">
        <span class="group-buy-name">{{ item.userName }}</span>
      </div>
      <div class="group-right">
        <div class="group-buy-msg">
          <p><span>还差</span><span class="red">{{ detail.groupSum - item.total }}</span><span>人成团</span></p>
          <p><span>截至时间</span><span class="red">{{item.time}}</span></p>
        </div>
        <div v-if="!item.isCaptain && !item.isJoin && item.status === 1" class="go-group" @click="onGoGroupBuy(index)">去拼团</div>
        <div v-if="item.status !== 3 && item.isCaptain" class="go-group captain">你是团长</div>
        <div v-if="item.status !== 3 && item.isJoin" class="go-group captain">已参团</div>
        <div v-if="item.status === 3" class="go-group active">已成团</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./group-buy-list.ts"></script>
<style lang="less" scoped>
  @import './group-buy-list.less';
</style>
