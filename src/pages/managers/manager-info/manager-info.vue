<template>
  <div class="manager-info" v-if="isLoad">
    <manager-photo :manager="managerInfo"></manager-photo>
    <manager-cover-info :manager="managerInfo"></manager-cover-info>
    <career-highlights :manager="managerInfo"></career-highlights>
    <personal-view :manager="managerInfo"></personal-view>
    <manager-life :manager="managerInfo"></manager-life>
    <recommended-products
      v-if="managerInfo.hasProduct"
      :manager="managerInfo"></recommended-products>
    <div class="bottom">
      <focus-msg :info="managerInfo" :attention="!!managerInfo.focusState" @focus="focusEvent"
                 @send="sendMsg"></focus-msg>
    </div>
  </div>
</template>

<script lang="ts" src="./manager-info.ts"></script>
<style lang="less">
  @import "./manager-info.less";
</style>

