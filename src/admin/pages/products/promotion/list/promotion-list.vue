<template>
  <div class="content">
    <card-promotion-info
      v-for="item in promotion"
      :key="item.name"
      :promotion="item"
      @click="onSelected"></card-promotion-info>
    <empty :list="promotion" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./promotion-list.ts">
</script>

<style lang="less">
@import "../../index.less";
</style>
