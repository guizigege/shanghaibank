<template>
  <div class="content-list">
    <i-cell-group
      v-if="!isEmpty"
      i-class="cell-group-class">
      <i-cell
        v-for="(item, index) in list"
        :key="item">
        <div @click="helpDetail(index)" class="item-warps">
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
    <empty :list="list" :loading="loading"></empty>
    <i-divider v-if="list.length !== 0 && subAmount === 0" content="加载完毕"></i-divider>
    <i-message id="message" />
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
