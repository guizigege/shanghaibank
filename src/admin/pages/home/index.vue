<template>
  <div class="page">
    <div class="search-bar" v-if="isBranch">
      <select-bank
        :list="bankList"
        @showSelect="onShowSelect"
        @chooseBank="onChooseBank"></select-bank>
    </div>
    <map
      id="qqmap"
      class="qqmap"
      style="width: 100%;"
      v-if="showMap"
      :scale="scale"
      :longitude="location.longitude"
      :latitude="location.latitude"
      :markers="markers"
      :circles="circles"
    >
      <cover-view class="tip">
        <cover-view class="exist-customer">
          <cover-image
            class="img"
            :src="iconPinkPoint" />
          <cover-view>已有客户{{ existCustomerCount }}</cover-view>
        </cover-view>
        <cover-view class="potential-customer">
          <cover-image
            class="img"
            :src="iconBluePoint" />
            <cover-view>潜在客户{{ potentialCustomerCount }}</cover-view>
        </cover-view>
      </cover-view>
      <cover-view
        class='btn-red-packet'
        v-if="isOffice"
        @click='onClickRedPacket'>
        <cover-view class='text'>红包获客</cover-view>
      </cover-view>
    </map>
    <div v-else class="selecting">
      选择网点……
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
@import "./index.less";
</style>


