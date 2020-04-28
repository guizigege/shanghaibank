<template>
  <div class="manager-company" v-if="isLoad">
    <card-manager-info
      :manager='item'
      v-for="(item,index) in manager"
      :key="index"
      @click="currentManager(index)"
    >
    </card-manager-info>
    <empty :list="manager" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./manager-company.ts"></script>
<style lang="less">
@import "./manager-company.less";
</style>
