<template>
  <div class="group-buy-detail" v-if="isLoad">
    <group-buy-list :detail="detail" @toOrder="openBuyModal" :list="list"></group-buy-list>
    <group-buy-modal :visible="toOrder" :groupId="buyGroupId"
                     :productId="productId" :buyType="buyType"
                     @joinSuccess="joinSuccess"
                     @closeToOrder="closeToOrder"></group-buy-modal>
    <i-toast id="toast"/>
    <empty v-if="list.length === 0"></empty>
  </div>
</template>

<script lang="ts" src="./group-buy-detail.ts"></script>
<style lang="less">
  @import './group-buy-detail.less';
</style>
