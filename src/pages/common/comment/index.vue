<template>
  <div class="content">
    <div class="select">
      <div class="picker-wrap">
        <picker @change="pickOffice" v-if="isBranch" :value="officeIndex" :range="officeRange" range-key="office">
          <view class="picker">
            {{currentOffice.office}}
            <i-icon type="unfold" size="19"/>
          </view>
        </picker>
        <picker @change="pickProduct" :value="productIndex" :range="productRange" range-key="title">
          <view class="picker">
            {{currentProduct.title}}
            <i-icon type="unfold" size="19"/>
          </view>
        </picker>
      </div>
      <div class="count">共{{count}}条评论</div>
    </div>
    <scroll-view v-if="!isEmpty" class="comment-wrap" @scrolltolower="commentLower" scroll-y>
      <admin-comment-list @reply="onLookDetail" @info="jumpUserInfo" :comments="list"></admin-comment-list>
    </scroll-view>
    <empty v-if="isEmpty"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
