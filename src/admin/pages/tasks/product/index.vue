<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="content">
    <div class="picker-wrap" v-if="canSelectOffice">
      <picker @change="pickOffice" :value="officeIndex" :range="officeList" range-key="office">
        <view class="picker">
          {{currentOffice.office}}
          <i-icon type="unfold" size="19"/>
        </view>
      </picker>
    </div>
    <div class="page-btn" v-if="canSelectBtn">
      <p
        :class="activeClass == index ? 'active':''"
        v-for="(item, index) in btnList"
        :key="index"
        @click="onSelectStatus(index)"
      >{{item}}</p>
    </div>
    <scroll-view
      scroll-y
      class="scroll-wrap"
      @scrolltolower="lower"
      v-if="current !== 'audit' && orderList.length > 0"
    >
      <template v-for="item in orderList" wx:key="item">
        <div class="item">
          <card-mini-superior-info :isSelfOffice="isSelfOffice" :info="item" @click="jumpDetail"></card-mini-superior-info>
        </div>
      </template>
    </scroll-view>
    <empty :list="orderList" :loading="loading"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
