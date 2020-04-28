<template>
  <div v-if="isLoad" class="detail-red">
    <card-red-base :detail="packetInfo"></card-red-base>
    <card-red-business :detail="packetInfo"></card-red-business>
    <card-red-select :detail="packetInfo"></card-red-select>
  </div>
</template>

<script lang="ts" src="./detail-red.ts"></script>

<style lang="less" scoped>
  .detail-red {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-bottom: 80px;
  }
</style>
