<!--网点/客户经理粉丝列表-->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="user-replay-detail" v-if="isLoad">
    <scroll-view class="fans-list" @scrolltolower="lower" scroll-y v-if="list.length !== 0">
      <template v-for="item in list" wx:key="item">
        <div class="item">
          <card-fans-info v-if="appType.Client === item.appId" :needFocus="needFocus" :user="item"></card-fans-info>
        </div>
      </template>
    </scroll-view>
    <empty v-if="list.length === 0"></empty>
  </div>
</template>

<script lang="ts" src="./fans-list.ts"></script>
<style lang="less" scoped>
  @import './fans-list.less';
</style>
