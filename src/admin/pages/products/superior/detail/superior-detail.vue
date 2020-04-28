<template>
  <div class="fixed-content ">
    <detail-product @edit="onEdit" :detail="item"></detail-product>

    <!-- <i-button @click="onGoBack">返回</i-button> -->
  </div>
</template>

<script lang="ts" src="./superior-detail.ts">
</script>

<style lang="less">
  @import "../../index.less";
</style>
