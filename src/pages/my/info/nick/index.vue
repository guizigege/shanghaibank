<template>
  <div>
    <i-cell-group>
      <i-cell title="昵称">
        <input slot="footer" @input="inputEvent" type="text" placeholder="想个昵称吧~" :value="userName" maxlength="15"/>
      </i-cell>
    </i-cell-group>
    <i-button @click="submit" :disabled="validator.$invalid" type="primary">提交</i-button>
    <i-toast id="toast" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>

</style>
