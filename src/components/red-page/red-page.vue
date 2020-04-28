<template>
  <div
    class="red-content"
    v-if="showRed">
    <div
      class="mask"
      @click="hideRed"></div>
    <div
      class="red-wrap"
      v-if="!showResult">
      <div class="red-wrap-top">
        <div class="logo">
          <img :src="iconBankLogo" alt="">
        </div>
          <div class="name">
            {{detail.product.office}}
          </div>
        </div>
        <div class="open"></div>
        <div
          class="btn"
          @click="openRed">开</div>
      </div>
      <i-message id="message" />
      <i-modal
        :visible="showResult"
        @ok="okEvent"
        :show-cancel="false">
        <view>恭喜你，领到了{{amount}}元</view>
      </i-modal>
    </div>
</template>

<script lang="ts" src="./red-page.ts"></script>

<style lang="less" scoped>
@import './red-page.less';
</style>
