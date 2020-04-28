<template>
  <div class="content-bank-info" :class="{'admin-app': !isClientApp}">
    <div class="header">
      <div class="share">
        <div class="bank-name">{{ bank.office }}</div>
        <p>
          <button plain="true" open-type="share" @click="onShare">
            <img :src="iconExport" alt>
          </button>
        </p>
      </div>
      <div class="bank-locale">
        <p>
          <i-icon type="coordinates" size="16"/>
          <span class="address">{{ bank.bankAddress || '未查询到地址信息' }}</span>
        </p>
        <p class="distance">{{ distance }} km</p>
      </div>
    </div>
    <div class="stat-bar">
      <div class="stat-item" @click="jumpManage">
        <span class="num">{{managerCount}}</span>
        <span class="name">客户经理</span>
      </div>
      <div class="stat-item" @click="jumpFans">
        <span class="num">{{fensCount}}</span>
        <span class="name">粉丝</span>
      </div>
      <div class="stat-item" @click="jumpComment">
        <span class="num">{{commentCount}}</span>
        <span class="name">评论</span>
      </div>
    </div>
    <div>
      <i-tabs
        :current="current"
        @change="onTabChange">
        <i-tab
          key="superior"
          title="优品"></i-tab>
        <i-tab
          key="promotion"
          title="活动"></i-tab>
      </i-tabs>

      <div v-if="current === superiorTab">
        <card-superior-info
          v-for="item in superior"
          :key="item.name"
          :superior="item"
          @click="onSelected"></card-superior-info>
      </div>
      <div v-else>
        <card-promotion-info
          v-for="item in promotion"
          :key="item.name"
          :promotion="item"
          @click="onSelected"></card-promotion-info>
      </div>

      <empty v-if="isEmpty" :loading="!isLoaded" :list="list"></empty>
    </div>
    <div class="bottom" v-if="isClientApp && isLoaded">
      <focus-msg :info="bank" @focus="focusEvent" @send="sendMsg"></focus-msg>
    </div>
  </div>
</template>

<script lang="ts" src="./bank-info.ts">
</script>

<style lang="less" scoped>
  @import "./bank-info.less";
</style>
