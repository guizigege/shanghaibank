<template>
  <div class="manager-life">
    <div class="manager-life-title">
      <p>Life</p>
      <p>我~生活</p>
    </div>
    <div class="manager-life-msg">
      <div v-if="photoUrl" :style="{ 'background-image':'url('+ photoUrl +')' }"></div>
      <div class="life-msg">
        <span>{{ manager.ex.userInfo.life }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./manager-life.ts"></script>

<style lang="less" scoped>
@import './manager-life.less';
</style>
