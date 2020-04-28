<template>
  <div class="content">
    <i-cell-group
      v-if="!isEmpty"
      i-class="cell-group-class">
      <i-cell
        v-for="(item, index) in list"
        :key="item">
        <div @click="msgDetail(index)" class="item-warp">
          <div class="item-icon">
            <img :src="item.realIcon" alt="">
          </div>
          <div class="item-right">
            <div class="item-content">
              <span class="item-hd"> {{item.userName}} </span>
              <span class="item-bd"> {{item.releaseTime}} </span>
            </div>
            <div class="item-ft">
              {{item.content}}
            </div>
          </div>
        </div>
      </i-cell>
    </i-cell-group>
    <empty :list="list" :loading="loading"></empty>
    <i-divider v-if="list.length !== 0 && subAmount === 0" content="加载完毕"></i-divider>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
