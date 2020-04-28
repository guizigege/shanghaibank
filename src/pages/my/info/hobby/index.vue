<template>
  <div>
    <i-panel>
      <div class="wrap">
        <textarea class="textarea-content" :value="hobby" @input="inputEvent" placeholder="有啥兴趣呢~"
                  placeholder-style="place" auto-focus auto-height
                  maxlength="200"/>
        <div class="count">{{count}}/200</div>
      </div>
    </i-panel>
    <i-button @click="submit" :disabled="validator.$invalid" type="primary">提交</i-button>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  @import "../../../../styles/form.less";

  .wrap {
    position: relative;

    .textarea-content {
      height: 120px !important;
    }

    .count {
      position: absolute;
      bottom: 5px;
      right: 15px;
      font-size: 12px;
      color: #ccc;
    }
  }

  .place {
    font-size: 14px;
  }
</style>
