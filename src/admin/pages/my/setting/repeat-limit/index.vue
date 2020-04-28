<template>
  <div>
    <i-cell-group>
      <i-cell title="同一网点" @click="setSome('office')" :value="office"></i-cell>
      <i-cell title="同一红包" @click="setSome('redPacket')" :value="redPacket"></i-cell>
      <i-cell title="同一优品" @click="setSome('product')" :value="product"></i-cell>
      <i-cell title="同一活动" @click="setSome('active')" :value="active"></i-cell>
    </i-cell-group>
    <i-toast id="toast"/>
    <i-modal :title="type[current]" :visible="showModal" @ok="okEvent" @cancel="closeModal">
      <view>
        <view class="limit">
          <view>是否限制</view>
          <i-switch :value="limit" @change="limitChange"></i-switch>
        </view>
        <view class="limit">
          <view :class="{disable: limit}">领取次数</view>
          <input type="text" class="input" :class="{disable: limit}" @input="countInput" :disabled="limit" :value="count">
        </view>
        <view class="limit">
          <view :class="{disable: limit}">间隔天数</view>
          <input type="text" class="input" :class="{disable: limit}" @input="dayInput" :disabled="limit" :value="IntervalDays">
        </view>
      </view>
    </i-modal>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .input {
    text-align: right;
  }

  .disable {
    color: #ccc;
  }

  .limit {
    display: flex;
    justify-content: space-between;
    padding: 3px 12px;
    color: #000;
  }

  .limit:nth-of-type(2) {
    border-bottom: .5px solid #f5f5f5;
    border-top: .5px solid #f5f5f5;
  }
</style>
