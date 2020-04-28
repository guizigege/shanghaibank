<template>
  <div class="get-red-page">
    <p>领取红包记录</p>
    <div class="get-red-page-list" v-if="hasRedLog">
      <div v-for="(item, index) in logList" :key="item" v-if="index === 0" >
        <div class="log-list" v-for="(log, i) in item" :key="log" @click="onLookMore(index, i)">
          <div v-if="i < 6">
            <img :src="log.realIcon" alt="">
          </div>
          <p>
            <i-icon type="enter" size="22"/>
          </p>
        </div>
      </div>
    </div>
    <empty v-if="!hasRedLog" :list="logList" :loading="false"></empty>
  </div>
</template>

<script lang="ts" src="./get-red-page.ts"></script>
<style lang="less" scoped>
  @import './get-red-page.less';
</style>
