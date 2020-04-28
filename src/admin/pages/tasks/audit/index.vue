<template>
  <div
    class="content"
    v-if="isLoad">
    <card-bank-info
      v-for="item in office"
      :key="item.name"
      :bank="item"
      @click="onSelected"></card-bank-info>
    <card-manager-info
      v-for="item in manager"
      :key="item.name"
      :manager="item"
      @click="onSelected"></card-manager-info>
    <card-superior-info
      v-for="item in superior"
      :key="item.name"
      :superior="item"
      @click="onSelected"></card-superior-info>
    <card-promotion-info
      v-for="item in promotion"
      :key="item.name"
      :promotion="item"
      @click="onSelected"></card-promotion-info>
    <card-red-packet-info
      v-for="item in redPacket"
        :key="item.name"
        :redPacket="item"
        @click="onSelected"
    ></card-red-packet-info>
    <scroll-view
      v-if="isManager"
      class="msg"
      @scrolltolower="lower"
      scroll-y>
    <user-comment-list
      @check="checkComment"
      v-if="isLoad"
      :comments="comments"></user-comment-list>
    </scroll-view>
    <empty :isEmpty="isEmptyTask" :loading="loading" :list="[1]"></empty>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style>
.content {
  width: 100%;
  min-height: 50px;
}

.msg {
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  height: calc(100vh - 44px);
}
</style>
