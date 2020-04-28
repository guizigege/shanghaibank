<!--活动-->
<template>
  <div class="order-detail-active">
    <div class="order-active-info">
      <div class="top">
        <img :src="info.realImageUrl">
        <div>
          <p>{{info.title}}</p>
          <p class="red">{{info.content}}</p>
          <p>
            <span>报名截止：</span>
            <span class="red">{{info.endTimeStr}}</span>
          </p>
          <p>
            <span>{{info.dist}}Km</span>
          </p>
        </div>
      </div>
      <div class="connect">
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

<script lang="ts" src="./order-detail-active.ts">
</script>

<style lang="less" scoped>
  @import "./order-detail-active";
</style>
