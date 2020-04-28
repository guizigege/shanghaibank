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
      <i-cell title="签名" is-link :url="AppUrls.ADMIN_MY_SETTING_SIGNATURE">
        <i-icon slot="icon" class="icon-menu" type="brush" size="34"/>
      </i-cell>
      <i-cell title="职称" is-link :url="AppUrls.ADMIN_MY_SETTING_JOB_TITLE">
        <i-icon slot="icon" class="icon-menu" type="businesscard" size="34"/>
      </i-cell>
      <i-cell title="标签" is-link :url="AppUrls.ADMIN_MY_SETTING_TAGS">
        <i-icon slot="icon" class="icon-menu" type="label" size="34"/>
      </i-cell>
      <i-cell title="手机" is-link :url="AppUrls.ADMIN_MY_SETTING_CONTACT">
        <i-icon slot="icon" class="icon-menu" type="mobilephone" size="34"/>
      </i-cell>
      <i-cell title="微信" is-link :url="AppUrls.ADMIN_MY_SETTING_WX">
        <i-icon slot="icon" class="icon-menu" type="interactive" size="34"/>
      </i-cell>
      <i-cell title="设置" is-link :url="AppUrls.ADMIN_MY_SETTING">
        <i-icon slot="icon" class="icon-menu" type="setup" size="34"/>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    padding: 25px;
    background-color: #00cccc;
    color: #fff;

    .avatar {
      width: 64px;
      height: 64px;
      background-color: #f5f5f5;
      margin-right: 18px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .user-info {
      display: flex;
      flex: 1;
      flex-direction: column;

      .nickname {
        margin-bottom: 10px;
        font-size: 16px;
      }

      .desc {
        font-size: 14px;
      }
    }

    .link-enter {
      padding: 20px;
    }
  }

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

