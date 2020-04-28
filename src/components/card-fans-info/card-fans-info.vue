<!-- 粉丝信息卡片 -->
<template>
  <div class="examine" @click="onClick">
    <div @click="userDetail" class="item-warp">
      <div class="item-icon">
        <img :src="user.realIcon" alt="">
      </div>
      <div class="item-right">
        <div class="item-content">
          <span class="item-hd"> {{user.userName || '未设置昵称'}}</span>
          <span class="item-bd"> {{user.releaseTime}} </span>
        </div>
        <div class="item-ft">
          {{user.desc}}
        </div>
        <div class="item-bds" v-if="needFocus">
          <span class="focus" @click="focusEvent" :class="{active: focusState}">+ 关注</span>
        </div>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./card-fans-info.ts">
</script>

<style lang="less" scoped>
  @import './card-fans-info.less';
</style>
