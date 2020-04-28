<template>
  <div class="content">
    <div style="display:flex; width: 100%" v-if="detail.isClient || detail.isOffice">
      <div style="display:flex; margin: 10px 10px">
        <view class="info-desc">面向对象</view>
      </div>
      <i-checkbox-group :current="currentCheckbox">
        <i-checkbox
          disabled
          position="left"
          v-for="item in checkboxValues"
          :key="item.id"
          :value="item.value"></i-checkbox>
      </i-checkbox-group>
    </div>
    <div style="display:flex; width: 100%">
      <div style="display:flex; margin: 10px 10px">
        <view class="info-desc">公告名称</view>
      </div>
      <span class="auto-hide">{{detail.title}}</span>
    </div>
    <div style="display:flex; width: 100%">
      <div style="display:flex; margin: 10px 10px">
        <view class="info-desc">公告内容</view>
      </div>
      <span class="auto-hide" style="white-space:normal;">{{detail.content}}</span>
    </div>
    <div style="display:flex; width: 100%">
      <div style="display:flex;margin: 10px 10px">
        <view class="info-desc">发布时间</view>
      </div>
      <div class="time">{{detail.releaseTime}}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./detail.ts">
</script>

<style lang="less" src="./detail.less" scoped>
</style>
