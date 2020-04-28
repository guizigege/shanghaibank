<template>
  <div class="content-list">
    <div class="add-plus" v-if="isBranch" @click="onClickAddNew">
      <i-icon type="add" size="38"/>
    </div>
    <i-cell-group
      v-if="!isEmpty"
      i-class="cell-group-class">
      <i-cell
        v-for="(item, index) in list"
        :key="item">
        <div @click="helpDetail(index)" @longpress="longEvent(index)" class="item-warp">
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
    <empty v-if="isEmpty"></empty>
    <i-divider v-if="list.length !== 0 && subAmount === 0" content="加载完毕"></i-divider>
    <i-modal :visible="delModal" @ok="delModalOK" @cancel="delModalCancel">
      <view>是否删除此帮助</view>
    </i-modal>
    <i-message id="message" />
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
