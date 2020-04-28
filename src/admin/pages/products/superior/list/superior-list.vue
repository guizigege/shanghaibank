<template>
  <div class="content">
    <card-superior-info
      v-for="item in superior"
      :key="item.name"
      :superior="item"
      @click="onSelected"></card-superior-info>
    <empty :list="superior" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./superior-list.ts">
</script>

<style lang="less">
@import "../../index.less";
</style>
