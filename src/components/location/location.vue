<template>
  <div class="select-btn" @click="onSelectLocation">
    {{ address }}
    <i-icon
      type="unfold"
      size="22"
      color="#8a8a8a" />
  </div>
</template>

<script lang="ts" src="./location.ts"></script>

<style lang="less">
.select-btn {
  font-size: 15px;
  color: #8a8a8a;
  margin-left: 15px;
}
</style>
