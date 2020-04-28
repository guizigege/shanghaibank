<!-- 优品信息卡片 -->
<template>
  <div class="active-card" @click="onClick">
    <div class="active-top">
      <div class="active-card-left">
        <div
          class="img"
          :style="{ 'background-image':'url('+ productLinkUrl +')' }">
          <div class="red-packet" v-if="!isOffice && superior.redCount > 0">
            <img :src="iconRedPacket" alt="" />
          </div>
        </div>
      </div>
      <div class="active-card-right">
        <div>
          <p class="active_top_text">
            <span>{{ superior.title }}</span>
            <span v-if="isAdminApp">{{ timeAgo }}</span>
            <span v-if="!isAdminApp">{{ distance }} km</span>
          </p>
          <p>
            <span class="active-introduce">{{ content }}</span>
          </p>
          <p>
            <span>有效期：</span>
            <span>{{ beginTime }}</span> ~ <span>{{ endTime }}</span>
            <span v-if="isOffice" class="audit-status">{{ productStatus }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="active-bottom">
      <i-rate
        disabled
        size="16"
        :value="superior.star">
      </i-rate>
      <div class="active-con">
        <contacts
          :wxNumber="superior.wxNumber"
          :location="superior.location"
          :mobile="superior.mobile"></contacts>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-superior-info.ts"></script>

<style lang="less" scoped>
  @import './card-superior-info.less';
</style>
