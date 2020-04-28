<!-- 登录授权 -->
<template>
  <div class="page">
    <div class="userinfo">
      <div class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <open-data type="userNickName"></open-data>
    </div>

    <h3>
      <open-data type="userNickName"></open-data> 您好， 欢迎使用上海银行获客小程序，允许微信授权后体验更多功能!
    </h3>

    <i-button
      type="primary"
      long="true"
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="onGetUserInfo">授权登录</i-button>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
@import "../../styles/var.less";

.page {
  font-size: @size-font-base;
  padding: @btn-padding-base;

  .warning {
    color: @warning-color
  }

  h3 {
    padding: 20px 0;
  }
}

.userinfo {
  position: relative;
  height: 320rpx;
  color: @title-color;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  overflow: hidden;
  display: block;
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
  margin-top: 50rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}
</style>
