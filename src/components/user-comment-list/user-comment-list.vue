<template>
  <div>
    <div class="user-comment-list" v-for="(comment, index) in comments" :key="comment">
      <div class="customer-img" @click.stop="clickIcon(index)">
        <img :src="comment.realIcon" alt="">
      </div>
      <div class="comment-msg">
        <div class="msg-hd">
          <span>{{ comment.userName || '没有设置昵称' }}</span>
          <span>{{ comment.releaseTime }}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
        <div class="others">
          <div class="reply" @click="onLookReplay(index)"
               v-if="comment.status === auditState.Approved && comment.hasReply">
            {{comment.replyCount}}回复
          </div>
          <div class="btn-group" v-if="isAdminApp">
            <div class="btn-status" :class="{active : comment.status === auditState.Approved}"
                 @click="checkComment(index, 'pass')">通过
            </div>
            <div class="btn-status" :class="{active : comment.status === auditState.Rejected}"
                 @click="checkComment(index, 'reject')">不通过
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-comment-list.ts"></script>

<style lang="less">
  @import './user-comment-list.less';
</style>
