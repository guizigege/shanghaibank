<template>

  <div class="list-item">
    <text class="list-title">{{title}}<text class="sign" v-show="sign"> *</text></text>
    <div class="type" v-if="type==='input'">
      <input type="number" class="list-input" :value="value" :placeholder="placeholder" placeholder-style="font-size:12px;color:#bbb" @input="inputVal" @blur="blur" :maxlength="maxLength">
      <text class="tip" v-if="!showTip">{{tip}}</text>
    </div>
      <div
        class="type"
        v-if="type==='select'"
        @click="onClick">
        <text class="list-desc" :class="[noSelect?'select':'selected']">{{desc}}</text>
        <span v-if="arrow"><i-icon type="enter" /></span>
      </div>
    </div>
</template>

<script lang="ts" src="./list-item.ts"></script>

<style lang="less" scoped>
.list-item {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #fff;
  .list-title {
    width: 30%;
    .sign {
      color: #ff3333;
    }
  }
  .type {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .list-input {
      width: 100px;
    }
    .tip {
      color: #ff3333;
      font-size: 12px;
    }
    .list-desc {
      width: 90%;
      display: inline-block;
      font-size: 12px;

      &.selected {
        font-size: 14px;
        color: #333;
      }

      &.select {
        color: #bbb;
      }

    }
  }
}
</style>
