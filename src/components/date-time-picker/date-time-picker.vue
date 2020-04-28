<template>
  <picker
    :mode="mode"
    :value="value"
    :start="start"
    :end="end"
    @change="onChange"
    @cancel="onCancel">
    <view
      class="placeholder"
      v-if="!value"> {{ placeholder }}</view>
    <view
      class="picker"
      v-if="value"> {{ value }}</view>
  </picker>
</template>

<script lang="ts" src="./date-time-picker.ts">
</script>

<style lang="less">
@import "../../styles/var.less";
.placeholder {
  color: @border-color-base;
}
</style>
