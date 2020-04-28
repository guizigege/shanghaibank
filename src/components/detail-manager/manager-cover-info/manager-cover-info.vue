<template>
  <div class="manager-cover-info">
    <!-- bigFrontCoverUrl大封面 -->
    <div class="manager-photo-img">
      <img :src="bigFrontCoverUrl" alt="" class="big-img">
      <div class="item">
        <p class="tag" v-for="(tag, index) in manager.tags" :key="tag" v-if="index % 2 === 0">{{ tag }}</p>
      </div>
      <div class="item">
        <p class="tag" v-for="(tag, index) in manager.tags" :key="tag"  v-if="index % 2 === 1">{{ tag }}</p>
      </div>
    </div>
    <div class="manager-cover-msg">
      <div class="manager-msg">
        <div>{{ manager.name }}</div>
        <div>{{ manager.signature }}</div>
      </div>
      <div class="manager-conect">
        <p @click="onCallPhone">Call她</p>
        <p @click="onAddWechat">加微信</p>
        <p @click="onGoFind">去找 Ta</p>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./manager-cover-info.ts"></script>

<style lang="less">
  @import "./manager-cover-info.less";
</style>
