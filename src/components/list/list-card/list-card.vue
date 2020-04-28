<template>
  <div class="list-card">
    <div class="list-card-title">{{title}}</div>
    <div class="list-card-content">
      <text class="list-card-desc">{{desc}}</text>
      <input
        type="number"
        class="list-input"
        :value="value"
        :placeholder="placeholder"
        placeholder-style="font-size:12px;color:#bbb;font-weight:normal"
        @input="input"
        @blur="blur"
        :data-id="id"
        :maxlength="maxLength"/>
    </div>
  </div>
</template>

<script lang="ts" src="./list-card.ts"></script>

<style lang="less" scoped>
  @import './list-card.less';
</style>
