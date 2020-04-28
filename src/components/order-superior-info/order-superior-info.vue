<!-- 订单信息卡片 -->
<template>
  <div
    class="order-superior-info"
    @click="onClick">
    <div class="order-superior-top">
      <div class="order-superior-left">
        <img :src="info.realImageUrl">
      </div>
      <div class="order-superior-right">
        <p class="branch_top_text">
          {{ info.title }}
        </p>
        <!--优品-->
        <div class="sign" v-if="info.productType === 1">
          <p>
            <span>工作日：</span>
            <span>{{ info.bankInfo.weekday }}</span>
          </p>
          <p>
            <span>节假日：</span>
            <span>{{ info.bankInfo.holiday }}</span>
          </p>
          <p v-if="info.status !== 4 && info.status !== 5">
            <span>截止时间：</span>
            <span class="red">{{info.isGroup ? info.groupEndTimeStr : info.endTimeStr}}</span>
          </p>
        </div>
        <!--活动-->
        <div class="sign" v-if="info.productType === 2">
          <p>
            <span>活动时间：</span>
            <span>{{ info.beginTimeStr }} ~ {{ info.endTimeStr }}</span>
          </p>
          <p v-if="info.status !== 3 && info.status !== 4 && info.status !== 5">
            <span>报名截止：</span>
            <span class="red">{{info.endTimeStr}}</span>
          </p>
        </div>
        <div class="order-status">
          <p>
            <span class="status">{{orderStatus[info.status]}}</span>
            <span v-if="info.isGroup && info.status !== 4 && info.status !== 5">
              <span>{{info.total}}</span>
              /
              <span>{{info.groupSum}}</span>
            </span>
          </p>
          <p v-if="info.isGroup" class="identity">{{groupType[info.isGroupLeader]}}</p>
        </div>
      </div>
    </div>

    <div class="connect">
      <div class="contacts">
        <contacts
          :wxNumber="info.wxNumber"
          :location="info.location"
          :mobile="info.mobile">
        </contacts>
      </div>
      <p>
        <span>{{ info.dist }}Km</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./order-superior-info.ts"></script>

<style lang="less" src="./order-superior-info.less" scoped></style>
