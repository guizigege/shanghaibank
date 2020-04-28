<template>
  <div class="user-replay-detail">
    <scroll-view class="msg" @scrolltolower="lower" scroll-y>
      <div class="user-comment-list">
        <div class="customer-img">
          <img :src="comment.realIcon" alt="">
        </div>
        <div class="comment-msg">
          <div class="msg-hd">
            <span>{{ comment.userName || '没有设置昵称' }}</span>
            <span>{{ comment.releaseTime }}</span>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>
      <div class="all-replay" v-if="isLoad">
        <p>全部回复</p>
        <admin-comment-list v-if="reply.length !== 0" :comments="reply"></admin-comment-list>
        <empty v-if="reply.length === 0"></empty>
      </div>
    </scroll-view>
  </div>
</template>

<script lang="ts" src="./admin-replay-detail.ts"></script>
<style lang="less">
  @import './admin-replay-detail.less';
</style>
