<template>
  <div class="hobby">
    <div class="hobby-box">
      <div
        class="hobby-item"
        v-for="(item, index) in hobby"
        :key="item.id"
        @click="doSelect(index)"
        :class="[item.selected?'selected':'select']">
        <img :src="item.url">
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="btn-group">
      <button class="cancel" @click="cancel">取消</button><button class="confirm" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
@import './index.less';
</style>
