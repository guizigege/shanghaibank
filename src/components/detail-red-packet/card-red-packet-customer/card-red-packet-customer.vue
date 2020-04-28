<template>
  <div class="card-red-packet-customer">
    <div class="content">
      <div class="left">
        <img :src="user.icon" alt="">
        <div class="left-sub">
          <div class="name">{{user.nick}}</div>
          <div class="date">{{createTime}}</div>
        </div>
      </div>
      <div class="right">
        {{money}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-red-packet-customer.ts"></script>
<style lang="less" scoped>
 @import './card-red-packet-customer.less';
</style>
