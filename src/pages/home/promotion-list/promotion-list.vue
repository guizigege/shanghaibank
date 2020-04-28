<template>
  <div>
    <card-promotion-info v-for="item in promotion" :key="item.productId" :promotion="item"></card-promotion-info>
    <empty :list="promotion" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./promotion-list.ts">
</script>

<style lang="less">
</style>
