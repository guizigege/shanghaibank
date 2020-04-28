<template>
  <div class="withdraw-detail">
    <div v-for="(item,index) in list" :key="index">
      <card-wallet-info :item="item" color="red" type="withdraw"></card-wallet-info>
    </div>
    <empty :list="list" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
// .withdraw-detail {
//   &:last-child {
//     .card-wallet-info {
//       &:last-child {
//         .wallet-info {
//           border-bottom: none !important;
//         }
//       }
//     }
//   }
// }
</style>
