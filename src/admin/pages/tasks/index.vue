<template>
  <div class="content">
    <i-tabs
      :current="current"
      @change="onTabChange">
      <i-tab
        key="audit"
        title="审核"></i-tab>
      <i-tab
        key="1"
        title="优品"></i-tab>
      <i-tab
        key="2"
        title="活动"></i-tab>
    </i-tabs>
    <div
      class="select-office"
      v-if="canSelectOffice && officeList.length">
      <select-bank
        :list="officeList"
        @chooseBank="onOfficeChanged"></select-bank>
    </div>

    <audit-list
      :selectedOffice="selectedOffice"
      v-if="current === 'audit'"></audit-list>
    <product v-else :current="current"></product>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
