<!--管理粉丝页面-->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="content">
    <div v-if="!isEmpty && isLoad" class="content-wrap">
      <template v-for="item in list" wx:key="item">
        <div class="item">
          <!--<card-bank-branch v-if="roles.Office === item.submitType" :bank="item"></card-bank-branch>-->
          <!--<card-manager-intro v-if="roles.Manager === item.submitType" :manager="item"></card-manager-intro>-->
          <card-fans-info v-if="appType.Client === item.appId" :needFocus="needFocus" :user="item"></card-fans-info>
        </div>
      </template>
    </div>
    <empty :list="list" :loading="loading"></empty>
    <i-divider v-if="list.length !== 0 && subAmount === 0" content="加载完毕"></i-divider>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
