<template>
  <div>
    <div class="user-comment-list" v-for="(comment, index) in comments" :key="comment" @click="onLookDetail(index)">
      <div class="customer-img" @click.stop="clickIcon(index)">
        <img :src="comment.realIcon" alt="">
      </div>
      <div class="comment-msg">
        <div class="msg-hd">
          <span>{{ comment.userName || '没有设置昵称' }}</span>
          <span>{{ comment.releaseTime }}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
        <div class="others" v-if="comment.hasReply">
          <div class="reply">
            {{comment.replyCount}}回复
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./admin-comment-list.ts"></script>

<style lang="less">
  @import './admin-comment-list.less';
</style>
