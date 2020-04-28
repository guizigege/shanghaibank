<template>
  <div class="manager-info">
    <manager-photo :manager="manager"></manager-photo>
    <manager-cover-info :manager="manager"></manager-cover-info>
    <career-highlights :manager="manager"></career-highlights>
    <personal-view :manager="manager"></personal-view>
    <manager-life :manager="manager"></manager-life>
    <recommended-products v-if="false" :manager="manager"></recommended-products>
  </div>
</template>

<script lang="ts" src="./detail-manager.ts"></script>

<style lang="less">
  @import './detail-manager.less';
</style>
