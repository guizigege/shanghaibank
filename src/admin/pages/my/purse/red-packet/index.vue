<template>
  <div class="content">
    <empty :list="redList" :loading="loading"></empty>
    <card-red-packet-info type="arrow" @toDetail="toDetail(red.packetId)" v-for="red in redList" :key="red.packetId" :redPacket="red"></card-red-packet-info>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .content {
    padding: 10px 0;
    font-size: 16px;
  }
</style>

