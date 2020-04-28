<template>
  <div class="card-wallet-info">
      <div class="wallet-info" v-if="type==='recharge'" >
        <div class="date">
          <span>【{{ state }}】</span><span>{{ dateTime }}</span>
        </div>
        <div class="balance" >
        <span :class="{ 'red': item.state === recharge.success, 'green': item.state === recharge.fail }">
          <i v-if="!(item.state === recharge.fail)">{{ money < 0 ? '-' : '+' }}</i>{{ money }}
        </span>
        </div>
      </div>
      <div class="wallet-info" v-if="type==='withdraw'">
        <div class="date">
          <span>【{{ status }}】</span><span>{{ dateTime }}</span>
        </div>
        <div class="balance" >
        <span :class="{ 'blue':item.status === withdraw.withdrawing,'red': item.status === withdraw.success, 'green': item.status === withdraw.fail }">
          <i v-if="!(item.status === withdraw.fail)">{{ money < 0 ? '-' : '+' }}</i>{{ money }}
        </span>
        </div>
      </div>
  </div>
</template>

<script lang="ts" src="./card-wallet-info.ts">
</script>

<style lang="less" scoped>
@import "./card-wallet-info.less";
</style>
