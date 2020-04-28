<template>
  <div class="user-comment-detail">
    <scroll-view class="msg" @scrolltolower="lower" scroll-y>
      <user-comment-list v-if="isLoad" @info="jumpUserInfo" :comments="comments"></user-comment-list>
      <empty :list="comments" :loading="!isLoad"></empty>
    </scroll-view>
    <div class="input">
      <div class="input-c">
        <input type="text" :value="commentText" @input="inputMsg" @focus="focusEvent" @blur="blurEvent"/>
      </div>
      <div class="submit" @click="onSend">发送</div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-comment-detail.ts"></script>
<style lang="less">
  @import './user-comment-detail.less';
</style>
