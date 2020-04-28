<template>
  <div class="modal-box" v-if="visible">
    <div class="modal-mask" @click.stop="closeModal"></div>
    <div class="modal-body">
      <div class="body-cell">
        <input type="text" placeholder="请输入您的姓名" @input="nameInput" :value="vm.name">
        <div class="error" v-if="validator.name.$anyError">
          <span v-if="!validator.name.required">请输入您的姓名</span>
        </div>
      </div>
      <div class="body-cell">
        <input type="text" placeholder="请输入您的手机号" @input="phoneInput" :value="vm.phone" @blur="phoneBlur">
        <div class="error" v-if="validator.phone.$anyError">
          <span v-if="!validator.phone.required">请输入您的手机号</span>
          <span v-if="!validator.phone.phoneNumber">手机号格式有误</span>
        </div>
      </div>
      <div class="send-code" v-if="!dirty || diff">
        <input type="text" placeholder="请输入验证码" @input="vm.code = $event.mp.detail.value; validator.code.$touch()">
        <div class="error" v-if="validator.code.$anyError">
          <span v-if="!validator.code.required">请输入验证码</span>
        </div>
        <button @click="onGetCode">{{ text }}</button>
      </div>
      <p class="send-code">
        <button class="group" @click="onStartGroup">{{ type[buyType] }}</button>
        <button @click.stop="closeModal">取消</button>
      </p>
    </div>
  </div>
</template>
<script lang="ts" src="./group-buy-modal.ts"></script>

<style lang="less" scoped>
  @import './group-buy-modal.less';
</style>

