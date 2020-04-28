<!-- 客户经理 > 选择网点 -->
<template>
  <div class="step-address">
    <div class="modal">
      <div class="content">
        <view class="picker" style="width:30%">支行：</view>
        <picker
          @change="onAddressChange"
          :value="index"
          :range="address"
          style="width:100%">
          <view class="picker-content">
            <view class="picker-border">
              {{ address[index] }}
              <i-icon type="unfold" size="22" color="#8a8a8a"/>
            </view>
          </view>
        </picker>
      </div>
      <div class="btn-group">
        <button @click="onPrev">上一步</button>
        <button @click="onNext">下一步</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./step-address.ts">
</script>

<style lang="less" scoped>
  @import "../../../../../styles/form.less";

  .step-address {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      width: 70%;
      background-color: #fff;
      display: flex;
      flex-direction: column;

      .content {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;

        .picker-content {
          display: flex;
          flex-wrap: nowrap;
          width: 100%;
          margin: 8px 0;
          align-items: center;

          .picker-border {
            border: .5px solid #f5f5f5;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
          }
        }
      }

      .btn-group {
        width: 100%;
        display: flex;

        button {
          width: 50%;
          background-color: #fff;
          border-radius: 0;
          border-top: .5px solid #ededed;

          &::after {
            border: none;
          }

          &:first-child {
            color: #ccc;
            border-right: .5px solid #ededed;
          }

          &:last-child {
            color: green;
          }
        }
      }
    }
  }
</style>



