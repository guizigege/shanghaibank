<template>
  <div>
    <card-superior-info v-for="item in superior" :key="item.productId" :superior="item"></card-superior-info>
    <empty :list="superior" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./superior-list.ts">
</script>

<style lang="less">
</style>
