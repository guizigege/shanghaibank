<!-- 附近网点 -->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="vicinity-branch-bank" v-if="isLoad">
    <template v-for="(item, index) in bankList" wx:key="item">
      <div class="item">
        <card-bank-branch @click="selectItem(index)" :bank="item"></card-bank-branch>
      </div>
    </template>
    <empty :list="bankList" :loading="!isLoad"></empty>
  </div>
</template>

<script lang="ts" src="./vicinity-branch-bank.ts"></script>

<style lang="less" scoped>
  @import "./vicinity-branch-bank.less";
</style>
