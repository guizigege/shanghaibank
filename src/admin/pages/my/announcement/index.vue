<template>
  <div class="content-list">
    <div class="add-plus" v-if="isBranch" @click="onClickAddNew">
      <i-icon type="add" size="38"/>
    </div>
    <i-cell-group>
      <i-cell v-for="(item, index) in list" :key="item">
        <div @click="announcementDetail(index)" @longpress="longEvent(index)" class="item-warps">
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
    <i-modal :visible="delModal" @ok="delModalOK" @cancel="delModalCancel">
      <view>是否删除此公告</view>
    </i-modal>
    <i-message id="message"/>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less" src="./index.less" scoped>
</style>
