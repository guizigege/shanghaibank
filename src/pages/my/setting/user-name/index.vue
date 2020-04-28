<template>
  <div>
    <i-cell-group>
      <i-cell title="姓名">
        <input slot="footer" @input="inputEvent" type="text" placeholder="请输入姓名" :value="realName" maxlength="15"/>
      </i-cell>
    </i-cell-group>
    <i-button @click="submit" :disabled="validator.$invalid" type="primary">提交</i-button>
    <i-toast id="toast" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>

</style>
