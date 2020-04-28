<template>
  <div class="card-bank-msg">
    <div class="bank-msg-top">
      <p class="bank-logo">
        <!-- <img :src="avatar" alt /> -->
        <image
          style="width: 80px; height: 30px;"
          :src="avatar"
        ></image>
        <span>{{ detail.product.bankName }} {{ detail.product.office }}</span>
      </p>
      <p
        class="button"
        @click="onEnterInter">进网点看看</p>
    </div>
    <div class="bank-msg-bottom">
      <!--活动页面没有网点评分项-->
      <i-rate v-if="detail.product.productType === 1"
        size="16"
        disabled
        :value="detail.product.star"></i-rate>
      <div class="connect">
        <contacts
          :wxNumber="detail.product.wxNumber"
          :location="location"
          :mobile="detail.product.mobile"></contacts>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-bank-msg.ts"></script>

<style lang="less" scoped>
  @import "./card-bank-msg.less";
</style>
