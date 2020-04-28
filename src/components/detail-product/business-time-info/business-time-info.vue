<template>
  <div class="business-time-info">
    <p>营业时间</p>
    <div class="business-time">
      <p>有效期：<span>{{ beginTime }}</span> ~ <span>{{ endTime }}</span></p>
      <p>工作日：
        <span>{{ weekday }}</span>
      </p>
      <p>节假日：
        <span>{{ holiday }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./business-time-info.ts"></script>

<style lang="less" scoped>
@import './business-time-info.less';
</style>
