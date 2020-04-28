<!-- 首页/附近轮播 -->
<template>
  <div class="content">
    <div class="add-plus" @click="onAdd">
      <i-icon type="add" size="38"/>
    </div>
    <div class="list">
      <i-swipeout
        i-class="swipeout-item"
        operateWidth="70"
        v-for="(item, index) in list"
        :key="item.bannerId">
        <div
          slot="content"
          class="list_item"
          @click="onClickItem(item)">
          <img :src="bannerUrls[index]">
          <div>
            <p class="title">{{ item.name }}</p>
            <p class="desc">
              <span>优先级: {{ item.index }}</span>
              <span class="status">{{ item.status === 0 ? '未发布' : '发布' }}</span>
            </p>
            <p class="desc">支行网点：{{ item.office }}</p>
          </div>
        </div>
        <div
          slot="button"
          class="swipeout-button-group">
          <view
            class="swipeout-button"
            @click="onRemove(item.bannerId)">删除</view>
        </div>
      </i-swipeout>
    </div>

    <i-load-more
      v-if="list.length === 0"
      tip="暂无数据"
      :loading="false" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
@import "./index.less";
</style>
