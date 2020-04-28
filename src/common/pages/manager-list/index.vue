<template>
  <div class="manager-list">
    <card-manager-info
      :manager='item'
      v-for="(item,index) in manages"
      :key="index"
      @click="currentManager(index)"
    >
    </card-manager-info>

    <empty v-if="manages.length === 0"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less">
  @import "./index.less";
</style>
