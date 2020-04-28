<template>
  <div class="card-comment-info">
    <div class="comment-num">
      <div>
        <span>客户评论</span>
        <span class="red">{{ comment.amount }}</span>
      </div>
      <div @click="onLookMore">
        <span class="more">查看全部</span>
        <i-icon type="enter" size="20"/>
      </div>
    </div>
    <!-- 评论list -->
    <div class="comment-list" v-for="item in comment.rows" :key="item">
      <div class="customer-img"><img :src="item.realIcon" alt=""></div>
      <div class="comment-msg">
        <div>
          <span>{{ item.userName }}</span>
          <span>{{ item.releaseTime }}</span>
        </div>
        <p class="comment-content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-comment-info.ts"></script>
<style lang="less" scoped>
  @import './card-comment-info.less';
</style>
