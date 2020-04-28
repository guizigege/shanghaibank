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
        <user-comment-list v-if="reply.length !== 0" :comments="reply"></user-comment-list>
        <empty :list="reply" :loading="!isLoad"></empty>
      </div>
    </scroll-view>
    <div class="input">
      <div class="input-c">
        <input type="text" :value="commentText" @input="inputMsg" @focus="focusEvent" @blur="blurEvent"/>
      </div>
      <div class="submit" @click="onSend">发送</div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-replay-detail.ts"></script>
<style lang="less">
  @import './user-replay-detail.less';
</style>
