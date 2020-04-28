<template>
  <div>
    <div class="step-type">
      <div class="modal">
        <div class="content">
          <radio-group class="radio-group" @change="onSignUpTypeChanged">
            <label class="radio" v-for="item in types" :key="item.id">
              <radio :value="item.value"/><text>{{item.value}}</text>
            </label>
          </radio-group>
        </div>
        <div class="btn-group">
          <button>取消</button>
          <button open-type="getUserInfo" @getuserinfo="onNext" :disabled="!current">确定</button>
        </div>
      </div>
    </div>

    <!---->
    <!--<i-panel title="选择身份">-->
      <!--<i-radio-group-->
        <!--:current="current"-->
        <!--@change="onSignUpTypeChanged">-->
        <!--<i-radio-->
          <!--v-for="type in signUpType"-->
          <!--:key="type"-->
          <!--:value="type"></i-radio>-->
      <!--</i-radio-group>-->
    <!--</i-panel>-->
    <!--<i-button-->
      <!--open-type="getUserInfo"-->
      <!--lang="zh_CN"-->
      <!--@getuserinfo="onNext"-->
      <!--:disabled="!current"-->
      <!--type="primary">下一步</i-button>-->

  </div>
</template>

<script lang="ts" src="./step-type.ts">

</script>

<style lang="less" scoped>
  .step-type {
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
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn-group {
        width: 100%;
        display: flex;
        button {
          width: 50%;
          background-color: #fff;
          border-radius: 0;
          border-top: 1rpx solid #ededed;
          &:first-child {
            color: #ccc;
            border-right: 1rpx solid #ededed;
          }
          &:last-child {
            color: green;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .step-type {
    .modal {
      .radio-group{
        .radio {
          height: 40px;
          line-height: 40px;
          display: flex;
          .wx-radio-input {
            /* 自定义样式.... */
            height: 20px;
            width: 20px;
            margin-top: -2px;
            border-radius: 50%;
            border: 1px solid #333;
            background-color: #fff !important;
          }
          .wx-radio-input.wx-radio-input-checked {
            border: 1px solid #333 !important;
          }
          .wx-radio-input.wx-radio-input-checked::before {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: black !important;
          }
        }
      }
      .btn-group {
        button {
          &::after {
            border: none;
          }
        }
      }
    }
  }
</style>
