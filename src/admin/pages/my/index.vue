<template>
  <div>
    <my-branch v-if="isBranch" :count="count"></my-branch>
    <my-office v-else-if="isOffice" :count="count"></my-office>
    <my-manager v-else-if="isManager" :count="count"></my-manager>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>

</style>
