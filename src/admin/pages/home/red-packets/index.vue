<template>
  <div class="home-red-packet">

    <div class="classify">
      <div>业务定向<text class="sign"> *</text></div>
      <div class="tip">(至少选填一项)</div>
    </div>
    <div class="panel">
      <list-card v-for="item in businessList" :key="item.productId" :title="item.title" :value="item.limitNum" desc="红包个数" placeholder="请设置数量上限" :id="item.productId"  @input="inputNumberLimit" @blur="blurNumberLimit" :maxLength="4"></list-card>
    </div>

    <div class="panel" style="margin-top: 10px;">
      <list-item title="红包均额" :value="redAvg" :sign="true" :placeholder="moneyPlaceholder" :tip="redAvgTip" :showTip="tips.hasRedAvg" type="input" @input="inputRedAvg" @blur="blurRedAvg" :maxLength="6"></list-item>
      <list-item title="红包总额" type="select" :arrow="false" :desc="selectText.redMoney" ></list-item>
      <list-item title="红包总数" type="select" :arrow="false" :desc="selectText.redNum" ></list-item>
      <list-item title="位置范围" :sign="true" type="select" :desc="selectText.range"  @click="selectArea"></list-item>
      <picker
        mode="multiSelector"
        @change="handleSelectTime"
        :value="timeArrayIndex"
        :range="timeArray"
      >
      <list-item title="发布时间" type="select" :desc="selectText.time"></list-item>
      </picker>
    </div>

    <div class="optional">
      <div class="fl">
        <text>最多选两项</text>
      </div>
      <div class="fr">
        <text>（选填） </text>
        <div
          class="hk"
          @click="showHk=!showHk"><text>精准获客</text>
          <i-icon
            type="unfold"
            :i-class="[showHk?'turnUp':'turnDown']" />
        </div>
      </div>
    </div>

    <div
      class="panel"
      v-show="showHk">
      <list-item
        title="可见客户"
        type="select"
        :desc="selectText.vision"
        @click="selectVision"></list-item>
      <i-action-sheet
        :visible="showSelect.vision"
        :actions="options.vision"
        :mask-closable="false"
        @iclick="handleSelectVision">
        <div
          slot="header"
          style="padding: 16px;margin-bottom: 5px"
          @click.stop="showSelect.vision=true">
          <text style="font-size:16px;color:#bbb;">请选择可见用户</text>
        </div>
      </i-action-sheet>


      <picker
        mode="multiSelector"
        @change="handleSelectAge"
        @cancel="cancelSelectAge"
        :value="ageArrayIndex"
        :range="ageArray"
        >
        <list-item
          title="年龄状况"
          type="select"
          :desc="selectText.age" ></list-item>
      </picker>

      <list-item
        title="选择性别"
        type="select"
        :desc="selectText.sex"
        @click="selectSex"></list-item>
      <list-item
        title="婚姻状况"
        type="select"
        :desc="selectText.marry"
        @click="selectMarry"></list-item>
      <list-item
        title="兴趣爱好"
        type="select"
        :desc="selectText.hobby"
        @click="selectHobby"></list-item>
      <list-item
        title="操作系统"
        type="select"
        :desc="selectText.system"
        @click="selectSystem"></list-item>
    </div>

    <div class="red-packet-btn">
      <button :class="[isSend?'able':'disable']" @click="selectPay">塞钱进红包</button>
    </div>

    <div
      class="mask"
      v-if="showSelect.sex"
      catchtouchmove="true">
      <div class="box">
        <div class="box-content">
          <radio-group class="radio-group" @change="handleSelectSex">
            <label class="radio" v-for="item in options.sex" :key="item.id">
              <radio :value="item.value"/><text>{{item.value}}</text>
            </label>
          </radio-group>
        </div>
      </div>
    </div>
    <div
      class="mask"
      v-if="showSelect.marry"
      catchtouchmove="true">
      <div class="box">
        <div class="box-content">
          <radio-group class="radio-group" @change="handleSelectMarry">
            <label class="radio" v-for="item in options.marry" :key="item.id">
              <radio :value="item.value"/><text>{{item.value}}</text>
            </label>
          </radio-group>
        </div>
      </div>
    </div>
    <div
      class="mask"
      v-if="showSelect.system"
      catchtouchmove="true">
      <div class="box">
        <div class="box-content">
          <radio-group class="radio-group" @change="handleSelectSystem">
            <label class="radio" v-for="item in options.system" :key="item.id">
              <radio :value="item.value"/><text>{{item.value}}</text>
            </label>
          </radio-group>
        </div>
      </div>
    </div>
    <div class="mask" v-if="showSelect.pay" catchtouchmove="true"  id="mask">
      <div class="box">
        <div class="box-content" style="width:85%;font-size:16px;">
          <div class="content-area">
            <div class="area-top">
              <div>需要支付</div>
              <div>
                <text class="money">{{payMoney}}</text>元
              </div>
            </div>
            <div class="area-middle" style="width:100%">
              <radio-group class="radio-group" @change="handleSelectPay">
                <label class="radio" style="display: inline-block;border-bottom: 1px solid #ddd;display: flex">
                  <radio value="余额支付" :checked="selectText.pay==='余额支付'?true:false"/>
                  <div style="float: right;display: flex;">
                    <div>
                      <img src="/static/images/pay_lq.png" class="icon">
                    </div>
                    <div class="pay-type">账户零钱</div>
                    <div class="residue">剩余<text class="money">{{cash}}</text>元</div>
                  </div>
                </label>
                <label class="radio" style="display: inline-block;">
                  <radio value="微信支付" :checked="selectText.pay==='微信支付'?true:false"/>
                  <div style="float: right;display: flex;">
                    <div>
                      <img src="/static/images/pay_wx.png" class="icon">
                    </div>
                    <div class="pay-type">微信支付</div>
                    <div class="residue">≥{{payMoney}}可用</div>
                  </div>
                </label>
              </radio-group>
            </div>
            <div class="area-bottom"><button class="pay-cancel" @click="handleCancelPay">取消</button><button class="pay-confirm" @click="handlePay">确认支付</button></div>
          </div>
        </div>
      </div>
    </div>
    <tip :tip="tip" :showTip="showTip"></tip>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
.home-red-packet {
  .turnUp {
    transform: rotateZ(180deg);
    transition: 0.4s all;
  }
  .turnDown {
    transform: rotateZ(0deg);
    transition: 0.4s all;
  }
}
.home-red-packet {
  .radio {
    height: 65px;
    line-height: 65px;
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
</style>
