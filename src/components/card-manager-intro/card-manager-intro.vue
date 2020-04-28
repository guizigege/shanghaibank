<!-- 客户经理信息卡片 -->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="examine-manager-intro" @click="onSelectManager">
    <div class="examine_card">
      <div class="examine_left">
        <img class="manager-img" :src="manageImg" alt="">
        <span class="title">{{manager.ex.userInfo.title}}</span>
      </div>
      <div class="examine_right">
        <p class="examine_name">
          <span class="name">{{ manager.userName }}</span>
          <span class="sign">{{ manager.ex.userInfo.signature }}</span>
        </p>
        <ul class="examine_product">
          <template v-for="(tag, index) in manager.ex.userInfo.tags" wx:key="index">
            <li v-if="index < 3">
              <img src="../../../static/images/info_lis.png" alt="">
              <span>{{ tag }}</span>
            </li>
          </template>
        </ul>
        <div class="connect">
          <contacts
            :wxNumber="manager.wxNumber"
            :location="manager.location"
            :mobile="manager.mobile">
          </contacts>
        </div>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./card-manager-intro.ts">
</script>

<style lang="less" scoped>
  @import './card-manager-intro.less';
</style>
