<!-- 明星网点 -->
<template>
  <div class="vicinity-page-tabs" v-if="isLoad">
    <div class="star">明星网点</div>
    <scroll-view scroll-x class="scroll-h">
      <div class="scroll-item"
           v-for="(item, index) in bankBranchList" :key="index" @click="scrollItem(index)">{{item}}
      </div>
    </scroll-view>
    <p @click="jumpAll">
      <i-icon type="more" size="30" color="gray"/>
    </p>
  </div>
</template>

<script lang="ts" src="./recommend-bank-list.ts">
</script>

<style lang="less" scoped>
  @import "./recommend-bank-list";
</style>
