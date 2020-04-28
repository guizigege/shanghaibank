<template>
  <div class="personal-view">
    <div class="personal-view-title">
      <p>Personal View</p>
      <p>个人观点</p>
    </div>
    <div class="personal-view-msg">
      <div>
        <span>*</span>
        <p>{{manager.ex.userInfo.viewpoint}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./personal-view.ts"></script>

<style lang="less">
  @import './personal-view.less';
</style>
