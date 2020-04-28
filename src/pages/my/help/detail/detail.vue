<template>
  <div class="content">
    <div style="display:flex; width: 100%">
      <div style="display:flex; margin: 10px 10px">
        <view class="info-desc">帮助标题</view>
      </div>
      <span class="auto-hide">{{detail.title}}</span>
    </div>
    <div style="display:flex; width: 100%">
      <div style="display:flex; margin: 10px 10px">
        <view class="info-desc">帮助内容</view>
      </div>
      <span class="auto-hide" style="white-space:normal;">{{detail.content}}</span>
    </div>
    <!--<div style="display:flex; width: 100%">-->
      <!--<div style="display:flex;margin: 10px 10px">-->
        <!--<view class="info-desc">发布时间</view>-->
      <!--</div>-->
      <!--<div class="time">{{detail.releaseTime}}</div>-->
    <!--</div>-->
  </div>
</template>

<script lang="ts" src="./detail.ts">
</script>

<style lang="less" src="./detail.less" scoped>
</style>
