<template>
  <div class="content">
    <my-header v-if="isLoad" :url="AppUrls.ADMIN_MY_INFO"></my-header>
    <div class="stat-bar">
      <navigator
        class="stat-item"
        :url="AppUrls.ADMIN_MY_BRANCH_SWIPER + '?type=0'">
        <span class="num">{{count.bannerHomeCount}}</span>
        <span class="name">首页轮播</span>
      </navigator>
      <navigator
        class="stat-item"
        :url="AppUrls.ADMIN_MY_BRANCH_SWIPER + '?type=1'">
        <span class="num">{{count.bannerLocationCount}}</span>
        <span class="name">附近轮播</span>
      </navigator>
      <navigator
        class="stat-item"
        :url="AppUrls.ADMIN_MY_COMMENTS">
        <span class="num">{{count.commentCount}}</span>
        <span class="name">评论</span>
      </navigator>
    </div>
    <i-cell-group class="cell-group">
      <i-cell title="消息" is-link :url="AppUrls.ADMIN_MY_MSG">
        <i-icon slot="icon" class="icon-menu" type="interactive" size="34"/>
      </i-cell>
      <i-cell title="公告" is-link :url="AppUrls.ADMIN_ANNOUNCEMENT_LIST">
        <i-icon slot="icon" class="icon-menu" type="systemprompt" size="34"/>
      </i-cell>
      <i-cell title="帮助" is-link :url="AppUrls.ADMIN_HELP_LIST">
        <i-icon slot="icon" class="icon-menu" type="feedback" size="34"/>
      </i-cell>
      <i-cell :title="location" is-link @click="selectLocation">
        <i-icon slot="icon" class="icon-menu" type="coordinates" size="34"/>
      </i-cell>
      <i-cell title="敏感词" is-link :url="AppUrls.ADMIN_MY_BRANCH_SENSITIVE_WORD">
        <i-icon slot="icon" class="prompt" type="prompt" size="34"/>
      </i-cell>
      <i-cell title="设置" is-link :url="AppUrls.ADMIN_MY_SETTING">
        <i-icon slot="icon" class="icon-menu" type="setup" size="34"/>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .stat-bar {
    display: flex;
    margin: 8px 0;
    background-color: #fff;

    .stat-item {
      display: flex;
      padding: 10px 0;
      flex-direction: column;
      align-items: center;
      flex: 1;

      .num {
        margin-bottom: 5px;
        font-size: 14px;
        color: #999;
      }

      .name {
        font-size: 15px;
      }
    }
  }
</style>
