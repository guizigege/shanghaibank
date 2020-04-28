<template>
  <div>
    <i-cell-group>
      <i-cell title="描述">
        <input slot="footer" class="input-desc" @input="inputEvent" type="text" placeholder="请输入描述" :value="desc" maxlength="25"/>
      </i-cell>
    </i-cell-group>
    <i-button @click="submit" :disabled="validator.$invalid" type="primary">提交</i-button>
    <i-toast id="toast" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .input-desc{
    width: 210px;
  }
</style>
