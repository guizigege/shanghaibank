<!-- 首页 -->
<template>
  <div class="client-page">
    <div class="client-page-bar">
      <location
        @loadCurrentLocation="onLoadCurrentLocation"
        @locationChanged="onLocationChanged"></location>
      <div class="search-bar-style">
        <SearchBar
          @change='onSearchChanged'
          @reset="onSearchChanged"
          :placeholder="placeholder"></SearchBar>
      </div>
      <div>
        <img :src="iconScan" alt @tap="onScanCode">
      </div>
      </div>

      <sweiper-images></sweiper-images>

      <i-tabs
        :current="current"
        @change="onTabChange">
        <i-tab
          key="superior"
          title="优品"></i-tab>
        <i-tab
          key="active"
          title="活动"></i-tab>
      </i-tabs>
      <superior-list v-if="current === 'superior'"></superior-list>
      <promotion-list v-else></promotion-list>
    </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import "./index.less";
</style>
