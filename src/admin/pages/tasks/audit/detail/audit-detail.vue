<template>
  <div class="content">
    <card-bank-info
      v-if="item.type === auditType.Office"
      :bank="item.info"></card-bank-info>
    <detail-manager
      v-if="item.type === auditType.Manager"
      :manager="item.info"></detail-manager>
    <detail-product
      v-if="item.type === auditType.Superior || item.type === auditType.Promotion"
      :detail="item.info"></detail-product>
    <detail-red
      v-if="item.type === auditType.RedPacket"
      :detail="item.info"></detail-red>

    <audit-action @save="onSave"></audit-action>
  </div>
</template>

<script lang="ts" src="./audit-detail.ts">
</script>

<style>
</style>
