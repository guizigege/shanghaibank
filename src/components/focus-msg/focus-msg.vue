<template>
  <div class="focus-msg">
    <div class="word-time" v-if="!!info.weekdayAmStartHour">
      <div>
        <span>工作日：</span>
        <span>{{ info.weekdayAmStartHour }} ~ {{ info.weekdayPmEndHour }}</span>
      </div>
      <div>
        <span>节假日：</span>
        <span>{{ info.holidayAmStartHour }} ~ {{ info.holidayPmEndHour }}</span>
      </div>
    </div>
    <div class="focus" :class="{bl: !!info.weekdayAmStartHour, active: !focusState}" @click="focusEvent">+ 关注</div>
    <div class="send-msg-1" @click="sendMsg">发消息</div>
  </div>
</template>

<script lang="ts" src="./focus-msg.ts"></script>

<style lang="less" scoped>
  @import "./focus-msg.less";
</style>
