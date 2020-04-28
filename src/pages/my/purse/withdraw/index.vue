<template>
  <div class="withdraw">
    <div class="content">
      <div class="pay-item top">
        <span>提现到微信：</span>
        <span>{{authName}}</span>
      </div>
      <div class="pay-item middle">
        <span>提现金额</span>
        <div class="btn-group">
            <button v-for="(item,index) in moneyList" :key="index" @click="selectMoney(item)" :class="{'select':(withdrawMoney===item?true:false)}" >{{item}}</button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="wx-balance">
        钱包余额：￥{{money}}
      </div>

      <div class="btn-box">
        <button class="confirm" @click="doWithdraw">确认提现</button>
      </div>

      <div class="tip">
        <div class="tip-title">提现说明</div>
        <div v-for="(tip, index) in tips" :key="index" class="tip-item">{{(index+1)}}、{{tip}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less">
  .select {
    color: #fff!important;
    background-color: rgba(204,51,51,1)!important;
    box-shadow: 2px 2px 2px #333 inset!important;
  }
  .withdraw {
    width:100%;
    height:100%;
    font-size: 15px;
    padding-top: 10px;
    .content {
      padding: 0 20px;
      height: 500px;
      background-color: #fff;
      box-sizing: border-box;
      .pay-item {
        padding:15px 0;
        span {
          display: inline-block;
          &:first-child {
            width: 30%;
          }
        }

      }
      .top {
        border-bottom: 1px solid #ddd;
      }
      .middle {
        span {
          float: left;
          vertical-align: top;
        }
        .btn-group {
          width: 70%;
          height: 80px;
          float: right;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: space-between;
          button {
            width: 70px;
            height: 35px;
            background-color: #fff;
            font-size: 15px;
            display: inline-block;
            box-shadow: 2px 2px 2px #333;

          }


        }
      }
      .wx-balance {
        height: 50px;
        line-height: 50px;
        padding-right: 10px;
        text-align: right;
      }
      .btn-box {
        margin-top: 30px;
        text-align: center;
        .confirm {
          padding: 2px 10px;
          color: #fff;
          background-color: rgba(204,51,51,1);
          border-radius: 5px;
          &:active {
            background-color: rgba(204,51,51,0.9);
          }
        }
      }
      .tip {
        margin-top: 15px;
        .tip-title {
          height: 50px;
          line-height: 50px;
          font-weight: bold;
        }
        .tip-item {
          font-size: 13px;
        }
      }
    }
  }


</style>
