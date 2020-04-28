<template>
  <div class="user-comment-detail">
    <scroll-view class="msg" @scrolltolower="lower" scroll-y>
      <admin-comment-list v-if="isLoaded" @info="jumpUserInfo" @reply="onLookDetail" :comments="comments"></admin-comment-list>
      <empty v-if="comments.length === 0"></empty>
    </scroll-view>
  </div>
</template>

<script lang="ts" src="./user-comment-detail.ts"></script>
<style lang="less">
  @import './user-comment-detail.less';
</style>
