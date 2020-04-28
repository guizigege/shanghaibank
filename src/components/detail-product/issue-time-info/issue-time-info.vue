<template>
  <div class="issue-time-info">
    <p>发布时间</p>
    <div class="issue-time">
      <p>发布时间：
        <span v-if="beginTime">{{ beginTime }}</span>
        <span style="color:red" v-else>未设置发布时间</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./issue-time-info.ts"></script>

<style lang="less" scoped>
  @import "./issue-time-info.less";
</style>
