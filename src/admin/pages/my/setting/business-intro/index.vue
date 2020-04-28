<template>
  <div>
    <i-panel>
      <div class="wrap">
        <textarea class="textarea-content" :value="abstract" @input="inputEvent" placeholder="请输入业务简介" placeholder-style="place" auto-focus auto-height
                  maxlength="100"/>
        <div class="count">{{count}}/100</div>
      </div>
      <i-button @click="submitInfo" :disabled="validator.$invalid" type="primary">提交</i-button>
    </i-panel>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less">
  @import "../../../../../styles/form.less";
  .wrap{
    position: relative;

    .count{
      position: absolute;
      bottom: 5px;
      right: 15px;
      font-size: 12px;
      color: #ccc;
    }
  }

  .place{
    font-size: 14px;
  }
</style>
