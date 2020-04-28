<template>
  <div class="red-packet-detail" style="padding-top:10px">
    <div v-for="item in list" :key="item.packetId">
      <card-red-packet-detail :detail="item"></card-red-packet-detail>
    </div>
    <empty :list="list" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>

</style>
