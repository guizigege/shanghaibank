<!-- 用户信息卡片 -->
<template>
  <div class="examine" @click="userInfo">
    <div class="item-warp">
      <div class="item-icon">
        <img :src="user.realIcon" alt="">
      </div>
      <div class="item-right">
        <div class="item-content">
          <span class="item-hd"> {{user.userName}}</span>
          <!--<span class="item-bd"> {{user.location}} </span>-->
        </div>
        <div class="item-ft">
          {{user.desc}}
        </div>
        <div class="item-bds">
          <div class="item-bds-left" @click.stop="sendMsg">
            <i-icon type="interactive" size="25" color="#00cccc"/>
            <span>发消息</span>
          </div>
        </div>
      </div>
    </div>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./card-user-info.ts">
</script>

<style lang="less">
  @import './card-user-info.less';
</style>
