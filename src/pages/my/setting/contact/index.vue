<template>
  <div>
    <i-panel>
      <i-cell-group>
        <i-cell title="手机号码">
          <input slot="footer" :value="phone" type="digit" @input="phoneEvent" placeholder="请输入手机号码"/>
        </i-cell>
        <div class="code-number">
          <input type="digit" class="code" @input="codeEvent" placeholder="请输入验证码"/>
          <i-tag @click="getVCode" :color="codeColor">{{codeTitle}}</i-tag>
        </div>
      </i-cell-group>
      <i-button @click="submitInfo" :disabled="validator.$invalid" type="primary">提交</i-button>
    </i-panel>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less">
  .code-number {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 0 15px;

    .code {
      margin-right: 10px;
    }
  }
</style>
