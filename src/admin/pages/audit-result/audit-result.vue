<template>
  <div class="content">
    <div class="message" v-if="!type">尊敬的用户，您的账号正在审核中，请耐心等待！</div>
    <div class="message" v-if="type === 'reject'">
      审核不通过:
      <span>{{ rejectReason }}</span>
      <i-button @click="onEdit" type="info">重新编辑</i-button>
    </div>
  </div>
</template>

<script lang="ts" src="./audit-result.ts">
</script>

<style>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 60%;
}
.message {
  width: 80%;
}
</style>
