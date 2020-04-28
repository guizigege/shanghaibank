<template>
  <div class="page">
    <i-row>
      <i-col
        v-if="isLoaded"
        span="20"
        offset="2"
        i-class="col-class">
        <p class="title">
          {{ isGroup ? '拼团业务' : '个体业务' }}
        </p>
        <div v-if="!(gift.name === '' && gift.desc === '' && gift.imageUrl === '')">
          <p class="gift-name">礼品名称：{{ gift.name }}</p>
          <p class="gift-desc">礼品描述：{{ gift.desc }}</p>
          <p>
            <img v-for="item in imageUrls"
                 :key="item"
                 :src="item"
                 @click="onPreview(item)"
                 alt>
          </p>
        </div>
      </i-col>
    </i-row>
    <p class="tips">{{tip}}</p>
  </div>
</template>

<script lang="ts" src="./gifts.ts">
</script>

<style lang="less" scoped>
  @import './gifts.less';
</style>
