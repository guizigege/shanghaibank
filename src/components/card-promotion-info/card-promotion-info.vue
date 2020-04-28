<!-- 活动信息卡片 -->
<template>
  <div class="branch-msg">
    <div class="branch-content">
      <div @click="onClick">
        <div
          class="img"
          :style="{ 'background-image':'url('+ productLinkUrl +')' }">
          <div class="status" v-if="isOffice">
            <p>{{ status }}</p>
          </div>
           <div class="red-packet" v-if="!isOffice && promotion.redCount > 0">
            <img :src="iconRedPacket" alt="" />
           </div>
        </div>
        <p class="branch_top_text">
          <span>{{ promotion.title }}</span>
          <span>{{ distance }} km</span>
        </p>
        <p class="branch-top-content">{{ content }}</p>
      </div>
      <div class="contact-content">
        <span>{{ beginTime }}</span>
        <div class="contacts-wrap">
          <contacts
            :wxNumber="promotion.wxNumber"
            :location="promotion.location"
            :mobile="promotion.mobile"></contacts>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-promotion-info.ts"></script>

<style lang="less" scoped>
@import "./card-promotion-info.less";
</style>
