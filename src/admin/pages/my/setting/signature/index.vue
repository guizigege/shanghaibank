<template>
  <div>
    <i-panel>
      <div class="wrap">
        <textarea class="textarea-content" :value="signature" @input="inputEvent" placeholder="请输入个性签名" placeholder-style="place" auto-focus auto-height
                  maxlength="10"/>
        <div class="count">{{count}}/10</div>
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

    .textarea-content{
      height: 34px !important;
    }
  }

  .place{
    font-size: 14px;
  }
</style>
