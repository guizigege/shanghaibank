<template>
  <div class="tip" v-if="showTip">
    <div class="content">{{tip}}</div>
  </div>
</template>

<script lang="ts" src="./tip.ts"></script>

<style lang="less" scoped>
  .tip {
    width: 100%;
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    .content {
      width: 80%;
      box-sizing: border-box;
      background:rgba(0,0,0,.7);
      color:#fff;
      font-size:14px;
      margin:0 auto;
      padding:10px 18px;
      border-radius:4px;
      z-index:100001;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
