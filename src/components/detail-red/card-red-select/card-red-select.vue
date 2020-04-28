<template>
  <div v-if="!isEmpty">
    <div class="type">精准获客</div>
    <div class="card-red-select">
      <div class="item" v-if="info.vision">
        可见客户
        <text class="text">{{ info.vision }}</text>
      </div>
      <div class="item" v-if="info.age">
        年龄状况
        <text class="text">{{ info.age }}</text>
      </div>
      <div class="item" v-if="info.sex">
        选择性别
        <text class="text">{{ info.sex }}</text>
      </div>
      <div class="item" v-if="info.marry">
        婚姻状况
        <text class="text">{{ info.marry }}</text>
      </div>
      <div class="item" v-if="info.hobby">
        兴趣爱好
        <text class="text">{{ info.hobby }}</text>
      </div>
      <div class="item" v-if="info.system">
        选择系统
        <text class="text">{{ info.system }}</text>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-red-select.ts"></script>

<style lang="less" scoped>
  @import '../detail-red.less';

.card-red-select {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px 30px;
  box-sizing: border-box;

  .item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;

    .text {
      color: #ff3333;
      font-size: 16px;
      margin-left: 30px;
    }

    &:last-child {
      border-bottom: none !important;
    }
  }
}
</style>
