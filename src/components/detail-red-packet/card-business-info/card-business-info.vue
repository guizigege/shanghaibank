<template>
  <div class="card-business-info">
    <div class="content">
      <div class="business-name">{{product.title}}</div>
      <div class="count">
        <div class="item">可领上限：{{product.limitNum}}</div>
        <div class="item">已领：{{product.log.length}}</div>
        <div class="item">已领金额：{{sumMoney}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-business-info.ts"></script>
<style lang="less" scoped>
  @import './card-business-info.less';

</style>
