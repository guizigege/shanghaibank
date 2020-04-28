<template>
  <div class="content">
    <i-cell-group>
      <i-cell
        v-for="(item, index) in list"
        :key="item">
        <div @click="announcementDetail(index)" class="item-warps">
          <div class="item-content">
            <span class="item-hd"> {{item.title}} </span>
            <span class="item-bd"> {{item.releaseTime}} </span>
          </div>
          <span class="item-ft">
            {{item.content}}
          </span>
        </div>
      </i-cell>
    </i-cell-group>
    <empty :list="list" :loading="!isLoad"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
