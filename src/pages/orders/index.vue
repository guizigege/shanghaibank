<!-- 订单模块 -->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="page">
    <i-tabs :current="current" @change="onTabsChange">
      <i-tab :key="1" title="优品"></i-tab>
      <i-tab :key="2" title="活动"></i-tab>
    </i-tabs>
    <div class="superior-page-btn">
      <p :class="activeClass == index ? 'active':''"
         v-for="(item, index) in btnList"
         :key="index"
         @click="onSelectStatus(index)">
        {{item}}
      </p>
    </div>
    <scroll-view scroll-y class="scroll-wrap" @scrolltolower="lower">
      <template v-for="(item, index) in list" wx:key="item">
        <div class="item">
          <order-superior-info :info=item @click="jumpDetail"></order-superior-info>
        </div>
      </template>
      <div class="empty">
        <empty :list="list" :loading="loading"></empty>
      </div>
    </scroll-view>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  @import "./index";
</style>
