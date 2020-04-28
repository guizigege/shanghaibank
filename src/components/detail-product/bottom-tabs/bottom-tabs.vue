<template>
  <div class="bottom-tabs">
    <div class="bottom-tabs-content">
      <div class="bottom-tabs-one">
        <div
          class="collect"
          @click="onCollect">
          <p>
            <i-icon
              :type="detail.collectState > 0 ? 'like_fill' : 'like'"
              :color="detail.collectState > 0 ? 'red' : ''"
              size="28" />
          </p>
          <p>收藏</p>
        </div>
        <div
          class="comment"
          @click="onComment">
          <p>
            <i-icon
              type="message"
              size="28" />
          </p>
          <p>评论</p>
        </div>
      </div>
      <div
        class="bottom-tabs-two"
        @click="onAppointment">
        <p>送油卡</p>
        <p v-if="detail.orderState === 0">单独预约</p>
        <p v-if="detail.orderState === 1">已预约</p>
      </div>
      <div
        class="bottom-tabs-three"
        @click="onStartGroupe">
        <p>送油卡和千元大礼包</p>
        <p v-if="detail.groupState === 0">发起拼团</p>
        <p v-if="detail.groupState === 1 && detail.group.isGroupLeader === 1">已发起拼团</p>
        <p v-if="detail.groupState === 1 && detail.group.isGroupLeader === 0">已参加拼团</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bottom-tabs.ts"></script>

<style lang="less" scoped>
@import './bottom-tabs.less';

.bottom-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
