<template>
  <div v-if="isLoaded">
    <detail-product
      @edit="onEdit"
      @reload="onReload"
      :isLoaded="isLoaded"
      :detail="item"></detail-product>
  </div>
</template>

<script lang="ts" src="./product-detail.ts">
</script>

<style lang="less">
</style>
