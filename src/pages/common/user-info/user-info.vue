<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="content-bank-info">
    <div class="header" v-if="isLoad">
      <div class="avatar">
        <img :src="info.realIcon" alt>
      </div>
      <div class="user-info">
        <span class="nickname">{{info.userName}}</span>
        <span class="desc">{{info.desc}}</span>
      </div>
    </div>
    <i-tabs
      :current="current"
      @change="onTabChange">
      <i-tab
        key="collect"
        title="收藏"></i-tab>
      <i-tab
        key="focus"
        title="关注"></i-tab>
      <i-tab
        key="fans"
        title="粉丝"></i-tab>
    </i-tabs>
    <div v-if="current === 'collect'">
      <card-superior-info v-for="item in collect" :key="item.productId" v-if="item.productType === 1"
                          :superior="item"></card-superior-info>
      <card-promotion-info v-for="item in collect" :key="item.productId" v-if="item.productType === 2"
                           :promotion="item"></card-promotion-info>
    </div>
    <div v-if="current !== 'collect'">
      <template v-for="item in list" wx:key="item">
        <div class="item">
          <card-bank-branch v-if="roles.Office === item.submitType" :bank="item"></card-bank-branch>
          <card-manager-intro v-if="roles.Manager === item.submitType" :manager="item"></card-manager-intro>
          <div class="item-fans">
            <card-fans-info v-if="appType.Client === item.appId" :needFocus="needFocus" :user="item"></card-fans-info>
          </div>
        </div>
      </template>
    </div>
    <empty v-if="isEmpty"></empty>
    <div class="bottom" v-if="isLoad">
      <focus-msg :info="info" :attention="!!info.focusState" @send="sendMsg"></focus-msg>
    </div>
  </div>
</template>

<script lang="ts" src="./user-info.ts">
</script>

<style lang="less" scoped>
  @import "./user-info.less";
</style>
