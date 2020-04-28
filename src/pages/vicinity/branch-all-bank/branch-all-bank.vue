<template>
  <div>
    <div class="vicinity-branch-bank" v-if="isLoad">
      <card-bank-branch
        v-for="(item, index) in allBankList" @click="selectItem(index)"
        :key="item.productId"
        :bank="item"></card-bank-branch>
    </div>
    <empty :list="allBankList" :loading="!isLoad"></empty>
  </div>
</template>

<script lang="ts" src="./branch-all-bank.ts"></script>

<style lang="less" scoped>
  @import "./branch-all-bank.less";
</style>
