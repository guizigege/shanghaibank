<template>
  <div class="header">
    <div class="avatar">
      <img :src="avatar">
    </div>
    <div class="user-info">
      <span class="nickname">{{userName}}</span>
      <span class="desc">{{desc}}</span>
    </div>
    <a @click="jumpInfo" class="link-enter">
      <i-icon type="enter" size="28"/>
    </a>
  </div>
</template>

<script lang="ts" src="./my-header.ts"></script>

<style lang="less">
  @import "./my-header.less";
</style>
