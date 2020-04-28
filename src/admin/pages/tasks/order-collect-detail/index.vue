<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div>
    <i-tabs :current="current" @change="onTabChange">
      <i-tab key="1" title="订单"></i-tab>
      <i-tab key="2" title="收藏"></i-tab>
    </i-tabs>
    <scroll-view scroll-y class="scroll-wrap" @scrolltolower="lower" >

      <template v-for="(item, index) in list" wx:key="item" v-if="list.length > 0">
        <div class="order-item" v-if="current === '1'">
          <div class="order-warp">
            <div class="order-hd">
              <div class="order-id">
                <span>订单号：</span>
                <span>{{item.orderID}}</span>
              </div>
              <div class="order-status">{{OrderAdminStatus[item.status]}}</div>
            </div>
            <div class="order-bd">
              <div class="order-left">
                <img :src="item.realIcon" alt="">
              </div>
              <div class="order-right">
                <div class="name">{{item.userName}}</div>
                <div class="mobile">联系方式：{{item.mobile}}</div>
                <div class="creat">
                  <span>{{item.releaseTime}}</span>
                  <span>{{item.dist}}Km</span>
                </div>
                <div class="last">
                  <span class="last-time">
                    <span v-if="item.status === 1 || item.status === 2">
                      <span>剩余时间：</span>
                      <span>{{item.endTimeStr}}</span>
                    </span>
                  </span>
                  <span class="num" v-if="isGroup">
                    <span>{{item.total}}</span>/<span>{{item.groupSum}}</span>
                  </span>
                  <span class="num" v-if="!isGroup">
                    1/1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="collect-item" v-if="current === '2'">
          <div class="collect-wrap">
            <div class="collect-left">
              <img :src="item.realIcon" alt="">
            </div>
            <div class="collect-right">
              <div class="name">{{item.userName}}</div>
              <div class="collect-right-bd">
                <div class="time">{{item.releaseTime}}</div>
                <div class="dist">{{item.dist}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <empty :list="list" :loading="loading"></empty>
    </scroll-view>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  @import "./index.less";
</style>
