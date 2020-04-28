<template>
  <div class="detail-red-packet">
    <div class="section">
      <card-red-packet-info :redPacket="redInfo" type="cash"></card-red-packet-info>
    </div>
    <div class="section">
      <card-business-info v-for="item in products" :key="item.productId" :product="item"></card-business-info>
    </div>

    <div class="section">
      <card-red-packet-customer v-for="(item, index) in logs" :key="index" :user="item"></card-red-packet-customer>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts">

</script>

<style lang="less" scoped>
  .detail-red-packet {
    display: flex;
    flex-direction: column;
    .section {
      margin-top: 10px;
    }
  }
</style>
