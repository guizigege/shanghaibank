<template>
  <div class="manager-photo" v-if="avatarUrl || frontCoverUrl">
    <div>
      <p>
        <img :src="avatarUrl" alt="">
      </p>
      <p>
        <img :src="frontCoverUrl" alt="">
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./manager-photo.ts"></script>

<style lang="less">
  @import './manager-photo.less';
</style>
