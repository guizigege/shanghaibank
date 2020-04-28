<template>
  <div>
    <i-panel>
      <div class="wrap">
        <textarea class="textarea-content" :value="life" @input="inputEvent" placeholder="写点生活感悟吧" placeholder-style="place" auto-focus auto-height
                  maxlength="50"/>
        <div class="count">{{count}}/50</div>
      </div>
      <uploader v-if="dis" :urls="photoUrl" @remove="removeEvent()" @uploaded="uploadEvent($event)"></uploader>
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
