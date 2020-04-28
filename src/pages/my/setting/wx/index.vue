<template>
  <div>
    <i-panel>
      <i-cell-group>
        <i-cell title="微信号">
          <input slot="footer" :value="wxNumber" type="text" @input="wxEvent" placeholder="请输入微信号"/>
        </i-cell>
      </i-cell-group>
      <i-button @click="submitInfo" :disabled="validator.$invalid" type="primary">提交</i-button>
    </i-panel>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less">

</style>
