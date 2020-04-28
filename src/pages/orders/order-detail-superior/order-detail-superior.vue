<template>
  <div class="order-detail-superior">
    <div class="order-detail-top">
      <p>订单号：
        <span>{{order.orderID}}</span>
      </p>
      <p @click="onGoBank">
        <i-icon type="coordinates" size="22" color="rgb(73, 238, 8)"/>
        <span class="txt">去网点</span>
      </p>
    </div>
    <!-- 拼团状态 -->
    <div class="group-status">
      <p>
        <span class="order-status">{{orderStatus[order.status]}}</span>
        <span v-if="order.isGroup && order.status !== 4 && order.status !== 5">
          <span>{{order.total}}</span>
          /
          <span>{{order.groupSum}}</span>
        </span>
      </p>
      <p v-if="order.isGroup" class="identity">{{groupType[order.isGroupLeader]}}</p>
    </div>
    <!-- 优品信息 -->
    <order-detail-bank v-if="order.productType === 1" :info="order"></order-detail-bank>
    <!-- 活动信息 -->
    <order-detail-active v-if="order.productType === 2" :info="order"></order-detail-active>
    <div class="group-time" v-if="order.isGroup">
      <p>
        <span>拼团时间：</span>
        <span>{{ groupCreateTimeStr }}</span>
      </p>
    </div>
    <div class="group-time" v-if="!order.isGroup">
      <p>
        <span>下单时间：</span>
        <span>{{ order.createTimeStr }}</span>
      </p>
    </div>
    <div class="active-time" v-if="order.productType === 2">
      <p>
        <span>活动时间：</span>
        <span>{{ order.beginTimeStr }} ~ {{ order.endTimeStr }}</span>
      </p>
    </div>
    <!-- 拼团业务 -->
    <div class="group-gift">
      <p>网点领奖</p>
      <div v-for="item in order.giftInfo" :key="item">
        <p>
          <span v-if="item.type === 'group'">拼团业务礼品信息：</span>
          <span v-if="item.type === 'person'">个人业务礼品信息：</span>
          <span class="red">{{item.name}}</span>
        </p>
        <div class="gift-img">
          <img v-for="(url, i) in item.realImageUrls" :key="url" :src="url">
        </div>
      </div>
    </div>
    <div class="business-time-info">
      <p>营业时间</p>
      <div class="business-time">
        <p>有效期：
          <span>{{ order.beginTimeStr }} ~ {{ order.endTimeStr }}</span></p>
        <p>工作日：
          <span>{{ order.bankInfo.weekday }}</span>
        </p>
        <p>节假日：
          <span>{{ order.bankInfo.holiday }}</span>
        </p>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./order-detail-superior.ts">
</script>

<style lang="less" scoped>
  @import "./order-detail-superior";
</style>
