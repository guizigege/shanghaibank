<!--客户粉丝页面-->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="content">
    <div v-if="isLoad" class="content-wrap">
      <template v-for="(item, index) in list" wx:key="item">
        <div class="item">
          <card-bank-branch v-if="roles.Office === item.submitType" @click="selectItem(index)" :bank="item"></card-bank-branch>
          <card-manager-intro v-if="roles.Manager === item.submitType" @click="currentManager(index)" :manager="item"></card-manager-intro>
          <card-user-info v-if="appType.Client === item.appId" @info="lookUserInfo(index)" @sendMsg="sendMsg(index)" :user="item"></card-user-info>
        </div>
      </template>
    </div>
    <empty :list="list" :loading="!isLoad" tip="暂无粉丝"></empty>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
