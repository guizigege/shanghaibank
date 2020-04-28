<!-- 轮播详情 -->
<template>
  <div class="content">
    <img :src="bannerUrl">
    <div>
      <p class="title">{{ item.name }}</p>
      <p class="desc">
        <span>优先级: {{ item.index }}</span>
        <span class="status">
          <i-switch
            :value="item.status"
            @change="onChangeStatus"
            size="large"
            slot="footer">
            <view slot="open">发布</view>
            <view slot="close">下线</view>
          </i-switch>
        </span>
      </p>
      <p class="desc">支行网点：{{ item.office }}</p>
      <p class="desc">优品活动：{{ item.productTitle }}</p>
      <p class="desc">发布周期：{{ beginTime }} ~ {{ endTime }}</p>
    </div>
  </div>
</template>

<script lang="ts" src="./swiper-detail.ts"></script>

<style lang="less" scoped>
@import "./swiper-detail.less";
</style>
