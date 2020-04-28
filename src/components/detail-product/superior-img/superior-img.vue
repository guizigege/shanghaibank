<template>
  <div
    class="superior-img"
    :style="{ 'background-image':'url('+ bannerUrl +')' }">
    <div
      class="superior-img-top"
      v-if="isClientApp">
      <p>
        <button plain="true" open-type="share" @click="onShare">
        <img :src="iconExport" alt=""></button></p>
    </div>
    <div class="superior-edit" v-if="canEdit">
      <p @click="onEdit">返回编辑</p>
    </div>
    <div class="superior-edit" v-else-if="canUnShelve">
      <p @click="onUnShelve">下架</p>
    </div>
  </div>
</template>

<script lang="ts" src="./superior-img.ts"></script>

<style lang="less" scoped>
@import "./superior-img.less";
</style>
