<!-- 客户经理信息卡片12 -->
<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="examine" @click="onClick">
    <div class="examine_card">
      <div class="examine_left">
        <img :src="manageImg" alt="">
        <img src="../../../static/images/info_logo.png" alt="">
      </div>
      <div class="examine_right">
        <p class="examine_name">
          <span class="name">{{ manager.userName }}</span>
          <span class="sign">{{ manager.signature }}</span>
        </p>
        <ul class="examine_product">
          <template v-for="(tag, index) in manager.ex.userInfo.tags" wx:key="index">
            <li v-if="index < 3">
              <img src="../../../static/images/info_lis.png" alt="">
              <span>{{ tag }}</span>
            </li>
          </template>
        </ul>
        <div class="examine_contact">
          <p @click.stop="onCallPhone">
            <img src="../../../static/images/info_phone.png" class="phone" alt="">
            <span>Call 她</span>
          </p>
          <p @click.stop="onAddWechat">
            <img src="../../../static/images/info_wechat.png" class="wechat" alt="">
            <span>加微信</span>
          </p>
          <p @click.stop="onGoBank">
            <img src="../../../static/images/info_location.png" class="location" alt="">
            <span>去找 Ta</span>
          </p>
        </div>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./card-manager-info.ts">
</script>

<style lang="less" scoped>
  @import './card-manager-info.less';
</style>
