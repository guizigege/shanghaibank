<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="content">
    <div class="top-line"></div>
    <ul class="more" v-if="subAmount > 0">
      <li class="dot"></li>
      <li class="dot"></li>
      <li class="dot"></li>
    </ul>
    <scroll-view class="msg" @scrolltoupper="upper" scroll-y :scroll-top="scrollTop + 'px'">
      <template v-for="item in list" wx:key="item">
        <div class="msg-other" v-if="item.sendId !== loginInfo.userId">
          <div class="msg-icon">
            <img :src="res.realIcon" alt="">
          </div>
          <div class="msg-content">{{item.content}}</div>
        </div>
        <div class="msg-self" v-if="item.sendId === loginInfo.userId">
          <div class="msg-content">{{item.content}}</div>
          <div class="msg-icon">
            <img :src="loginInfo.realIcon" alt="">
          </div>
        </div>
      </template>
    </scroll-view>
    <div class="input">
      <div class="input-c">
        <input :value="msg" @input="inputMsg"/>
      </div>
      <div class="submit" @click="sendMsg">发送</div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
