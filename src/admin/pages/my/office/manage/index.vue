<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="content">
    <i-tabs
      :current="current"
      @change="onTabChange">
      <template v-if="business.length > 0" v-for="item in business" wx:key="item">
        <i-tab
          :key="item.businessType"
          :title="item.content">
        </i-tab>
      </template>
    </i-tabs>
    <div class="list">
      <template v-for="(item, index) in manages" wx:key="item">
        <cardManagerInfo v-if='isLoad' :manager="item" @click="navTo(index)"></cardManagerInfo>
      </template>
      <empty :list="manages" :loading="loading"></empty>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style>
</style>
