<template>
  <div class="card-check">
    <div class="card-check-left">
      <p class="card-check-active">{{ detail.product.title }}</p>
      <p class="card-check-name">
        <span v-if="giftName">{{ giftName }}</span>
        <span>{{ detail.product.groupSum }}人拼</span>
      </p>
      <p class="card-check-look">
        <span>{{ detail.groupCount || 0 }}<span>人已团</span></span>
        <span v-if="detail.product.status === productAuditState['已发布']">
          <i-icon type="browse"/>
          {{ detail.product.exposureCount }}
        </span>
      </p>
    </div>
    <div class="card-check-right">
      <p v-if="isAdminApp">{{ statusName }}</p>
      <p>{{ distance }} Km</p>
    </div>
  </div>
</template>

<script lang="ts" src="./card-check-status.ts"></script>

<style lang="less" scoped src="./card-check-status.less"></style>
