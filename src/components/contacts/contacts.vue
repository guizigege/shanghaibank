<template>
  <div class="contacts">
    <p @click.prevent.stop="onAddWechat">
      <i-icon type="interactive_fill"
              size="22"
              color="rgb(73, 238, 8)"/>
      <span>加微信</span>
    </p>
    <p @click.prevent.stop="onCallPhone">
      <i-icon type="mobilephone"
              size="22"
              color="rgb(73, 238, 8)"/>
      <span>打电话</span>
    </p>
    <p @click.prevent.stop="onGoBank">
      <i-icon type="coordinates"
              size="22"
              color="rgb(73, 238, 8)"/>
      <span>去网点</span>
    </p>

    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./contacts.ts"></script>

<style lang="less" scoped>
  @import './contacts.less';
</style>
