<template>
  <div class="page">
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

<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
