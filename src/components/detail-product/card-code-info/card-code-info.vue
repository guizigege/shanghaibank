<template>
  <div class="card-code-info">
    <p>扫码有奖</p>
    <div>
      <img :src="url" @click="onClick" alt="">
    </div>
  </div>
</template>

<script lang="ts" src="./card-code-info.ts"></script>

<style lang="less" scoped>
@import './card-code-info.less';
</style>
