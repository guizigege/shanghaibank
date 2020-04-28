<!-- 附近模块 -->
<template>
  <div class="vicinity-page">
    <div class="vicinity-page-top">
      <location
        @loadCurrentLocation="onLoadCurrentLocation"
        @locationChanged="onLocationChanged"></location>
      <div class="search-bar-style">
        <SearchBar
          @change='onSearchChanged'
          @reset="onSearchChanged"
          :placeholder="placeholder"></SearchBar>
      </div>
    </div>

    <sweiper-images :type="swiperType"></sweiper-images>

    <recommend-bank-list></recommend-bank-list>

    <vicinity-branch-bank></vicinity-branch-bank>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import "./index";
</style>
