<template>
  <div>
    <i-panel>
      <picker @change="bindPickerChange" range-key="title" :value="index" :range="recommendProducts">
        <div class="picker">
          推荐产品：{{content}}
        </div>
      </picker>
      <div class="wrap">
        <textarea class="textarea-content" :value="recommend" @input="inputEvent" placeholder="写点推荐寄语吧" placeholder-style="place" auto-focus auto-height
                  maxlength="30"/>
        <div class="count">{{count}}/30</div>
      </div>
      <i-button @click="submitInfo" :disabled="$v.$invalid" type="primary">提交</i-button>
    </i-panel>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less">
  @import "../../../../../styles/form.less";
  .picker{
    font-size: 14px;
    padding: 20px 10px;
  }
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
