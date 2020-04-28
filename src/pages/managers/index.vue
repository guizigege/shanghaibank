<!-- 客户经理模块 -->
<template>
  <div class="managers-page">
    <div class="managers-page-top">
      <location-map
        @loadCurrentLocation="onLoadCurrentLocation"
        @locationChanged="onLocationChanged"></location-map>
      <select-bank :list="rangeBankList" @chooseBank="chooseBank"></select-bank>
      <p>{{ currentBank.distance }}km</p>
    </div>
    <i-tabs
      :current="current"
      @change="onTabChange"
    >
      <i-tab
        key="personal"
        title="个人业务"></i-tab>
      <i-tab
        key="company"
        title="公司业务"></i-tab>
      </i-tabs>
      <manager-oneself v-if="current === 'personal'"></manager-oneself>
      <manager-company v-else></manager-company>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less">
@import "./index";

</style>

