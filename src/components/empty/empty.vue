<template>
  <div>
    <i-load-more v-if="loading"/>
    <i-load-more :tip="tip" :loading="false" v-if="(!loading)&&(list.length===0)"/>
    <i-load-more tip="暂无数据" :loading="false" v-if="isEmpty"/>
  </div>

</template>

<script lang="ts" src="./empty.ts"></script>

<style lang="less">
  @import "./empty.less";
</style>
