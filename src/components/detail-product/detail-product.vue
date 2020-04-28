<template>
  <div class="superior-no-check" :class="{bottom : isClientApp}" v-if="product">
    <!-- banner -->
    <superior-img @unShelve="onUnShelve" :status="product.status" :bannerId="product.imageUrl"></superior-img>

    <!-- 产品审核状态 -->
    <card-check-status :detail="detail"></card-check-status>

    <!-- 拼团信息 -->
    <group-buy-info v-if="!isGroup" :detail="detail" @toOrder="openBuyModal"></group-buy-info>

    <!-- 支行网点信息 -->
    <card-bank-msg :detail="detail" @click="jumpBank"></card-bank-msg>

    <!-- 评论信息，已发布的产品才有 -->
    <card-comment-info v-if="isPublish" @click="onComment" :comment="detail.comment"></card-comment-info>

    <!-- 产品描述信息 -->
    <superior-describe :product="product"></superior-describe>

    <!-- 礼品信息 -->
    <business-info v-if="hasGift" :gifts="gifts" :detail="detail" @openRed="openRedPage"></business-info>

    <!-- 红包，已发布的产品才有 -->
    <get-red-page v-if="isPublish" :detail="detail"></get-red-page>

    <!--红包-->
    <red-page :detail="detail" :packetId="packetId" @getRedSuccess="onGetRedSuccess"></red-page>

    <!--拼团modal-->
    <group-buy-modal v-if="isClientApp"
                     :groupId="buyGroupId"
                     :productId="detail.product.productId" :visible="toOrder" :buyType="buyType"
                     @orderSuccess="orderSuccess"
                     @groupSuccess="groupSuccess"
                     @joinSuccess="joinSuccess"
                     @closeToOrder="closeToOrder"></group-buy-modal>

    <!-- 二维码 -->
    <card-code-info :qrId="product.qrId" v-if="product.qrId && !isClientApp"></card-code-info>

    <!-- 营业时间 -->
    <business-time-info :detail="detail"></business-time-info>

    <!-- 发布时间 -->
    <issue-time-info :product="product" v-if="!isPublish && !isClientApp"></issue-time-info>

    <!-- 收藏 -->
    <bottom-tabs v-if="isClientApp" :detail="detail" @toOrder="openBuyModal"></bottom-tabs>
  </div>
</template>

<script lang="ts" src="./detail-product.ts">
</script>

<style lang="less" scoped>
  @import "./detail-product.less";

  .superior-no-check {
    position: relative;
  }
</style>
