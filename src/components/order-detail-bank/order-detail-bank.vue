<template>
  <div class="order-detail-bank">
    <div class="order-bank-info">
      <div class="top">
        <img :src="info.realImageUrl" alt="">
        <div>
          <p>{{info.title}}</p>
          <p class="red">{{info.content}}</p>
          <p>
            <span>截止时间：</span>
            <span class="red">{{info.isGroup ? info.groupEndTimeStr : info.endTimeStr}}</span>
          </p>
          <p>
            <span>{{info.dist}}Km</span>
          </p>
        </div>
      </div>
      <div class="connect">
        <p>
          <i-rate :disabled="true"
                  size="17"
                  :value="info.star">
          </i-rate>
        </p>
        <p @click="onAddWechat">
          <i-icon type="interactive_fill"
                  size="22"
                  color="rgb(73, 238, 8)"/>
          <span class="txt">加微信</span>
        </p>
        <p @click="onCallPhone">
          <i-icon type="mobilephone"
                  size="22"
                  color="rgb(73, 238, 8)"/>
          <span class="txt">打电话</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./order-detail-bank.ts">
</script>

<style lang="less" scoped>
  @import "./order-detail-bank";
</style>
