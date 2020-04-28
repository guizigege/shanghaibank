<template>
  <div>
    <div class="audit-action">
      <i-radio-group
        :current="current"
        @change="onAuditChange"
        i-class="check-radio">
        <i-radio
          v-for="item in audit"
          :key="item.id"
          :value="item.text"></i-radio>
      </i-radio-group>

      <div
        class="reject-reason"
        v-if="isReject">
        <textarea
        type="textarea"
        placeholder="请输入不通过的原因（不通过必填）"
        maxlength="50"
        :value="desc"
        @input="desc = $event.mp.detail.value"
      ></textarea>
        <p>
          <span>{{ desc.length }}/50</span>
        </p>
      </div>

      <div class="btn-submit">
        <i-button
          @click="onSave"
          :disabled="disabled"
          :long="'true'"
          type="error">提交</i-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./audit-action.ts">
</script>

<style lang="less">
@import './audit-action.less';

.i-cell {
  background: rgba(0, 0, 0, 0) !important;
}

.textarea {
  height: 70px;
  min-height: 70px;
}
</style>
