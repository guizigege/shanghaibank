<template>
  <div class="area">
    <div class="search-bar">
      <input
        class="search-input"
        placeholder="请输入关键字搜索"
        :value="POI"
        @input="onInput"
        @focus="showResultList=true"
      >
      <button
        class="search-btn"
        size="mini"
        @click="onOk"
      >确定</button>
    </div>
    <scroll-view
      scroll-y
      v-if="showResultList">
      <i-cell-group>
        <i-cell
          v-for="item in resultList"
          :title="item.title"
          :label="item.address"
          is-link
          :key="item.id"
          @click="onSelectedSearchItem(item)"></i-cell>
      </i-cell-group>
    </scroll-view>
    <div class="item">
      <div class="item-name">设置范围</div>
      <div class="item-radio">
        <radio-group class="radio-group" @change="handleSelectArea">
          <label class="radio" v-for="item in areaOptions" :key="item.id">
            <radio :value="item.value" :checked="item.value==area"/>{{item.value/1000}}km
          </label>
        </radio-group>
      </div>
    </div>
    <map
      id="qqmap"
      class="qqmap"
      style="width: 100%;"
      :scale="scale"
      :longitude="location.longitude"
      :latitude="location.latitude"
      :markers="markers"
      :circles="circles"
    >
    </map>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  @import './index.less';
</style>
<style lang="less">
  .area {
    .radio {
      .wx-radio-input {
        height: 20px;
        width: 20px;
        margin-top: -2px;
        border: 1px solid #333;
        border-radius: 0;
        box-sizing: border-box;
        background-color: #fff !important;
      }

      .wx-radio-input.wx-radio-input-checked {
        border: 1px solid #333 !important;
      }

      .wx-radio-input.wx-radio-input-checked::before {
        color: #333;
      }
    }
  }
</style>
