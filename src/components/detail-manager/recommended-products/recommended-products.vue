<template>
  <div class="recommended-products">
    <div class="recommended-title">
      <p>Recommended Products</p>
      <p>推荐产品</p>
    </div>
    <div class="recommended-content">
      <div class="recommended-msg">
        <div>
          <img :src="productPhoto" alt="">
        </div>
        <div>
          <p>{{manager.productInfo.title}}</p>
          <p style="color: red;">{{manager.productInfo.content}}</p>
          <p>有效期：{{manager.productInfo.beginTime}}~{{manager.productInfo.endTime}}</p>
        </div>
      </div>
      <div class="recommended-introduce">
        <!--<div>-->
        <!--<span>听我说产品</span>-->
        <!--<span class="embed" @click="onPlayEmbed">-->
        <!--<i-icon type="play" size="23" v-if="isPlay == false" color="#fff" />-->
        <!--<i-icon type="suspend" size="23" v-else color="#fff"  />-->
        <!--<embed src="" autostart="true" loop="true" hidden="false" width=150 height=20>-->
        <!--</span>-->
        <!--</div>-->
        <p>{{manager.ex.userInfo.recommend}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./recommended-products.ts"></script>

<style lang="less">
  @import './recommended-products.less';
</style>
