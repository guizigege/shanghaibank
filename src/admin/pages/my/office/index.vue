<template>
  <div class="content">
    <my-header v-if="isLoad" :url="AppUrls.ADMIN_MY_INFO"></my-header>
    <div class="stat-bar">
      <div class="stat-item" @click="jumpAttention">
        <span class="num">{{count.focusCount}}</span>
        <span class="name">关注</span>
      </div>
      <div class="stat-item" @click="jumpFan">
        <span class="num">{{count.fensCount}}</span>
        <span class="name">粉丝</span>
      </div>
      <div class="stat-item" @click="jumpComment">
        <span class="num">{{count.commentCount}}</span>
        <span class="name">评论</span>
      </div>
    </div>
    <i-cell-group class="cell-group">
      <i-cell title="钱包" is-link :url="AppUrls.ADMIN_MY_PURSE">
        <i-icon slot="icon" class="icon-menu" type="redpacket" size="34"/>
      </i-cell>
      <i-cell title="消息" is-link :url="AppUrls.ADMIN_MY_MSG">
        <i-icon slot="icon" class="icon-menu" type="systemprompt" size="34"/>
      </i-cell>
      <i-cell title="公告" is-link :url="AppUrls.ADMIN_ANNOUNCEMENT_LIST">
        <i-icon slot="icon" class="icon-menu" type="barrage" size="34"/>
      </i-cell>
      <i-cell :title="location" is-link @click="selectLocation">
        <i-icon slot="icon" class="icon-menu" type="coordinates" size="34"/>
      </i-cell>
      <i-cell title="客户经理" is-link :url="AppUrls.ADMIN_MY_OFFICE_MANAGE">
        <i-icon slot="icon" class="icon-menu" type="group" size="34"/>
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
    margin: 7px 0;
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

