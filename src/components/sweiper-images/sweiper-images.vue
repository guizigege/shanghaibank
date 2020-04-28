<template>
  <div class="carousel-container">
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000">
      <div
        v-for="(item, index) in imgUrls"
        :key="item">
        <swiper-item>
          <image
            :src="item"
            @click="onClick(index)"
            class="slide-image"
            width="100%"
            height="200" />
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script lang="ts" src="./sweiper-images.ts"></script>

<style lang="less">
@import './sweiper-images.less';

swiper {
  width: 100%;
  height: 200px !important;

  image.slide-image {
    width: 100% !important;
    height: 200px !important;
  }
}
</style>
