<template>
  <div class="content">
    <i-tabs
      :current="current"
      @change="onTabChange">
      <i-tab key="superior" title="优品"></i-tab>
      <i-tab
        key="promotion"
        title="活动">
        </i-tab>
    </i-tabs>

    <div class="tool">
      <div
        class="select-office"
        v-if="isBranch && loaded">
        <select-bank
          :list="officeList"
          :current="currentSelectedOffice"
          @chooseBank="onOfficeChanged"></select-bank>
      </div>
      <div
        class="search-text"
        v-else>
        <search-bar
          @change="onSearchChanged"
          @reset="onSearchChanged"></search-bar>
        <i-button
          i-class="btn-new-add"
          v-if="isOffice"
          @click="onAdd"
          type="success">新增</i-button>
      </div>
    </div>

    <superior-list v-if="current === 'superior'"></superior-list>
    <promotion-list v-if="current === 'promotion'"></promotion-list>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style>
  @import "./index.less";
</style>
