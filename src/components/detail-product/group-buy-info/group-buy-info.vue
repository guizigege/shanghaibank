<template>
  <div>
    <div class="group-buy-info">
      <div class="group-num">
        <div>
          <span>{{ detail.group.count }}人在拼团</span>
        </div>
        <div @click="onLookMore">
          <span class="more">查看更多</span>
          <i-icon type="enter" size="20"/>
        </div>
      </div>
      <!-- 拼团list -->
      <div class="group-buy-list" v-for="(item, index) in list" :key="item">
        <div class="group-buy-img">
          <img :src="item.realIcon" alt="">
          <span class="group-buy-name">{{ item.userName }}</span>
        </div>
        <div class="group-right">
          <div class="group-buy-msg">
            <p v-if="detail.product.groupSum - item.total !== 0">
              <span>还差</span><span class="red">{{ detail.product.groupSum - item.total }}</span><span>人成团</span>
            </p>
            <p v-if="detail.product.groupSum - item.total === 0"><span>已满员</span></p>
            <p><span>剩余</span><span class="red">{{item.time}}</span></p>
          </div>
          <div v-if="isClientApp">
            <div v-if="!item.isExp && !item.isCaptain && item.status === 1 && !item.isJoin" class="go-group" @click="onGoGroupBuy(index)">
              去拼团
            </div>
            <div v-if="!item.isExp && item.status !== 3 && item.isCaptain" class="go-group captain">你是团长</div>
            <div v-if="!item.isExp && item.status === 3" class="go-group active">已成团</div>
            <div v-if="!item.isExp && item.status !== 3 && item.isJoin" class="go-group captain">已参团</div>
            <div v-if="item.isExp" class="go-group active">已过期</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" src="./group-buy-info.ts"></script>
<style lang="less" scoped>
  @import './group-buy-info.less';
</style>
