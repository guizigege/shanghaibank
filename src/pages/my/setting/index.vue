<template>
  <div>
    <i-cell-group>
      <i-cell title="手机号码" is-link :url="AppUrls.CLIENT_SETTING_CONTACT" :value="mobile"></i-cell>
      <i-cell title="微信号" is-link :url="AppUrls.CLIENT_SETTING_WX" :value="wxNumber"></i-cell>
      <i-cell title="添加姓名" is-link :url="AppUrls.CLIENT_SETTING_USER_NAME" :value="realName"></i-cell>
      <i-cell title="Ta人关注">
        <i-switch :value="isFocus" @change="focusChange" slot="footer">
          <i-icon type="right" slot="open"></i-icon>
          <i-icon type="close" slot="close"></i-icon>
        </i-switch>
      </i-cell>
    </i-cell-group>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .i-cell-ft {
    width: 200px;
    overflow: hidden;
  }
</style>
