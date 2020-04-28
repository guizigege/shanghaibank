<template>
  <div>
    <i-tabs
      :current="current"
      @change="onTabChange"
    >
      <i-tab
        key="all"
        title="全部"></i-tab>
      <i-tab
        key="recharge"
        title="充值"></i-tab>
      <i-tab
        key="withdraw"
        title="提现"></i-tab>
    </i-tabs>
    <card-wallet-info
      v-for="(item, index) in walletList" :key="index" :item="item"
    ></card-wallet-info>
    <empty :list="walletList" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>

</style>
