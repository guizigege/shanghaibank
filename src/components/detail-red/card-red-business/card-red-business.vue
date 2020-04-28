<template>
  <div v-if="products.length">
    <div class="type">业务定向</div>
    <div class="card-red-business">
      <div
        v-for="item in products"
        :key="item.productId"
        class="item">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-content">
          红包个数
          <text class="num">{{ item.limitNum }}</text>个
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./card-red-business.ts"></script>

<style lang="less" scoped>
@import "../detail-red.less";

.card-red-business {
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #fff;

  .item {
    display: flex;
    flex-direction: column;

    .item-title {
      height: 40px;
      line-height: 40px;
    }

    .item-content {
      height: 30px;
      line-height: 30px;
      font-size: 12px;

      .num {
        font-size: 16px;
        color: #ff3333;
        margin: 0 8px 0 30px;
      }
    }
  }
}
</style>
