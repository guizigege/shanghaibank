<template>
  <div>
    <i-panel>
      <div class="wrap" v-for="(item, index) in tags" :key="index">
        <textarea class="textarea-content" :value="item" @input="inputEvent($event, index)" placeholder="请输入职业亮点"
                  placeholder-style="place" auto-focus auto-height
                  maxlength="8"/>
        <div class="count">{{item.length}}/10</div>
        <div class="less" @click="lessEvent(index)">-</div>
      </div>
      <div class="add">
        <div class="tip">3~6个标签</div>
        <i-icon v-if="tags.length !== 6" type="add" size="30" @click="addEvent"/>
      </div>
      <i-button @click="submitInfo" :disabled="check" type="primary">提交</i-button>
    </i-panel>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less">
  @import "../../../../../styles/form.less";

  .wrap {
    position: relative;
    display: flex;
    justify-content: center;
    margin-right: 10px;

    .count {
      position: absolute;
      bottom: 12px;
      right: 62px;
      font-size: 12px;
      color: #ccc;
    }

    .less {
      font-size: 40px;
      padding: 10px 15px;
      line-height: 30px;
    }

    .textarea-content {
      width: 300px;
      height: 34px !important;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px;

    .tip {
      font-size: 14px;
    }
  }

  .place {
    font-size: 14px;
  }
</style>
