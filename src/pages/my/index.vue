<template>
  <div class="content">
    <!--v-if="isLoad"-->
    <my-header :url="AppUrls.CLIENT_MY_INFO"></my-header>
    <div class="stat-bar">

      <div class="stat-item" @click="toCollection">
        <span class="num">{{collectCount}}</span>
        <span class="name">收藏</span>
      </div>
      <div class="stat-item" @click="jumpAttention">
        <span class="num">{{focusCount}}</span>
        <span class="name">关注</span>
      </div>
      <div class="stat-item" @click="jumpFans">
        <span class="num">{{fensCount}}</span>
        <span class="name">粉丝</span>
      </div>
    </div>
    <i-cell-group class="cell-group">
       <i-cell title="红包" is-link="true" :url="AppUrls.CLIENT_MY_PURSE">
        <i-icon slot="icon" class="icon-menu" type="redpacket" size="36"/>
      </i-cell>
      <i-cell title="消息" is-link :url="AppUrls.CLIENT_MY_MSG">
        <i-icon slot="icon" class="icon-menu" type="interactive" size="36"/>
      </i-cell>
      <i-cell title="公告" is-link :url="AppUrls.CLIENT_MY_ANNOUNCEMENT_LIST">
        <i-icon slot="icon" class="icon-menu" type="systemprompt" size="36"/>
      </i-cell>
      <i-cell title="帮助" is-link :url="AppUrls.CLIENT_MY_HELP_LIST">
        <i-icon slot="icon" class="icon-menu" type="feedback" size="36"/>
      </i-cell>
      <i-cell title="设置" is-link :url="AppUrls.CLIENT_SETTING">
        <i-icon slot="icon" class="icon-menu" type="setup" size="36"/>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .stat-bar {
    display: flex;
    margin: 15px 0;
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

