<template>
  <div class="detail-red-packet">
    <div class="line"></div>
    <card-red-packet-info></card-red-packet-info>
    <div class="line"></div>
    <card-business-info></card-business-info>
    <card-business-info></card-business-info>
    <card-business-info></card-business-info>
    <div class="line"></div>
    <card-red-packet-customer></card-red-packet-customer>
  </div>
</template>

<script lang="ts" src="./detail-red-packet.ts">

</script>

<style lang="less" scoped>
  .detail-red-packet {
    .line {
      width: 100%;
      height: 4px;
      background-color: #F5F5F5;
    }
  }

</style>
