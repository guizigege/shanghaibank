<template>
  <div class="red-receive-log">
    <div class="receive-log">
      <div class="receive-amount">已领取{{detail.red.getCount}}份</div>
      <div class="receive-list">
        <card-red-receive v-for="(item, index) in detail.log" :key="index" :info="item"
                          @user="jumpUser"></card-red-receive>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./red-receive-log.ts"></script>
<style lang="less">
  @import './red-receive-log.less';
</style>
