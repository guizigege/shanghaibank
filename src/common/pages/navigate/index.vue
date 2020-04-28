<template>
  <div class="page">
    <div class="head">
      <div class="title">{{ bankLocation.name }}</div>
      <div class="location-info">
        <div class="info-left">
          <i-icon slot="icon" type="coordinates" size="27" />
          <span class="addr">{{ bankLocation.address }}</span>
        </div>
        <span class="distance">{{ distance }} km</span>
      </div>
    </div>
    <map
      id="qqmap"
      class="qqmap"
      style="width: 100%;"
      :longitude="centerLocation.longitude"
      :latitude="centerLocation.latitude"
      :markers="markers"
      :polyline="polyline"
      :scale="scale"
    ></map>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
.page {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 210rpx;
    color: #fff;
    background-color: #00CCCC;

    .title {
      padding: 0 0 0 25rpx;
      margin-bottom: 20rpx;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
    }
  }

  .location-info {
    display: flex;
    padding: 0 25rpx 0 15rpx;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    .info-left{

    }

    .addr {
      padding-right: 30rpx;
      font-size: 14px;
    }

    .distance {
      flex: 0 0 130rpx;
      font-size: 12px;
      text-align: right;
    }
  }

  .qqmap {
    flex: 1;
  }
}
</style>
