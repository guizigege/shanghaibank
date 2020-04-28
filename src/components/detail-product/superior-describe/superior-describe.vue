<template>
  <div class="superior-describe">
    <p class="describe-title">{{product.productType === 1 ? '优品描述' : '活动描述'}}</p>
    <div v-if="product">
      <div class="describe-content">{{ product.content }}</div>
      <div class="describe-img">
        <img v-for="item in urls" :key="item" :src="item" @click="onPreview(item)" alt>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./superior-describe.ts"></script>

<style lang="less" scoped>
  @import "./superior-describe.less";
</style>
