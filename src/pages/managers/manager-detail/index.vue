<template>
  <div class="manager-info">
    <div class="header" v-if="isLoad">
      <div class="avatar">
        <img mode="aspectFit" :src="manager.realIcon" alt>
      </div>
      <div class="user-info">
        <span class="nickname">{{manager.name}}</span>
        <span class="desc">{{manager.desc}}</span>
      </div>
    </div>
    <div class="stat-bar" v-if="isLoad">
      <div class="stat-item" @click="jumpFocus">
        <span class="num">{{focusCount}}</span>
        <span class="name">关注</span>
      </div>
      <div class="stat-item" @click="jumpFans">
        <span class="num">{{fensCount}}</span>
        <span class="name">粉丝</span>
      </div>
      <div class="stat-item" @click="jumpComment">
        <span class="num">{{commentCount}}</span>
        <span class="name">评论</span>
      </div>
    </div>
    <manager-cover-info v-if="isLoad" :manager="manager"></manager-cover-info>
    <career-highlights v-if="isLoad" :manager="manager"></career-highlights>
    <personal-view v-if="isLoad" :manager="manager"></personal-view>
    <recommended-products v-if="isLoad && hasRecommend" :manager="manager"></recommended-products>
    <manager-life v-if="isLoad" :manager="manager"></manager-life>
    <div class="bottom" v-if="isLoad">
      <focus-msg :info="manager" @focus="focusEvent" @send="sendMsg"></focus-msg>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less">
  @import "./index.less";
</style>

