<template>
  <div class="content">
    <card-superior-info
      v-for="item in collectList"
      :key="item.productId"
      v-if="item.productType === 1"
      :superior="item">
    </card-superior-info>
    <card-promotion-info
      v-for="item in collectList"
      :key="item.productId"
      v-if="item.productType === 2"
      :promotion="item">
    </card-promotion-info>
    <empty :list="collectList" :loading="loading" tip="暂无收藏"></empty>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>

</style>
