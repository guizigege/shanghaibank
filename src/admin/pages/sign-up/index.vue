<template>
  <div class="content">
    <step-type v-if="step === 0"></step-type>

    <!-- 支行网点注册 -->
    <div v-if="!isManager">
      <step-outlets v-if="step === 1"></step-outlets>
    </div>

    <!-- 经理注册 -->
    <div v-if="isManager">
      <step-address v-if="step === 1"></step-address>
      <step-manager-info v-if="step === 2"></step-manager-info>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style>
</style>
