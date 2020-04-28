<template>
  <div class="card-mini-superior-info">
    <div
      class="content"
      @click="onClick">
      <div class="photo fl">
        <img :src="info.realImageUrl" alt="">
      </div>
        <div class="info">
          <div class="info-wrap">
            <div>{{info.title}}
              <text v-if="isReject">【{{status}}】</text>
            </div>
            <div>订单
              <text>{{info.groupCount}}</text>
              人
            </div>
            <div>收藏
              <text>{{info.collectCount}}</text>
              人
            </div>
          </div>
          <div
            class="arrow"
            v-if="isSelfOffice">
            <i-icon
              type="enter"
              size="22" />
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" src="./card-mini-superior-info.ts"></script>

<style lang="less" scoped>
@import './card-mini-superior-info.less';
</style>
