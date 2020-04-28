<template>
  <div style="margin-top:10px;">
    <i-toast id="toast"/>
    <div class="content-from">
      <div style="display:flex; width: 100%">
        <div class="cell-wrap">
          <view class="info-desc">帮助标题</view>
          <view class="info-desc red">*</view>
        </div>
        <div :class="{ 'announcement-content' : true, 'single-line': true, 'red-border' : validator.title.$invalid }">
          <textarea type="text" placeholder="请输入帮助标题"
                    :maxlength="titleMaxLength"
                    :value="vm.title"
                    @input="vm.title = $event.mp.detail.value; validator.title.$touch()"
          ></textarea>
          <p>
            <span>{{ vm.title.length }}/{{ titleMaxLength }}</span>
          </p>
        </div>
      </div>
      <div style="display:flex; width: 100%">
        <div class="cell-wrap">
          <view class="info-desc">帮助内容</view>
          <view class="info-desc red">*</view>
        </div>
        <div :class="{ 'announcement-content' : true, 'multi-line': true, 'red-border' : validator.content.$invalid }">
          <textarea type="textarea" placeholder="请输入帮助内容"
                    :maxlength="contentMaxLength"
                    :value="vm.content"
                    @input="vm.content = $event.mp.detail.value; validator.content.$touch()"
          ></textarea>
          <p>
            <span>{{ vm.content.length }}/{{contentMaxLength}}</span>
          </p>
        </div>
      </div>
      <!--<div style="display:flex; width: 100%">-->
        <!--<div class="cell-wrap">-->
          <!--<view class="info-desc">发布日期</view>-->
          <!--<view class="info-desc red">*</view>-->
        <!--</div>-->
        <!--<div class="time">-->
          <!--<date-time-picker-->
            <!--:mode="'date'"-->
            <!--:value="vm.date"-->
            <!--@change="vm.date = $event; validator.date.$touch()"-->
            <!--@cancel="validator.date.$touch()"></date-time-picker>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div style="display:flex; width: 100%">-->
        <!--<div class="cell-wrap">-->
          <!--<view class="info-desc">发布时间</view>-->
          <!--<view class="info-desc red">*</view>-->
        <!--</div>-->
        <!--<div class="time">-->
          <!--<date-time-picker-->
            <!--:mode="'time'"-->
            <!--:value="vm.time"-->
            <!--@change="vm.time = $event; validator.time.$touch()"-->
            <!--@cancel="validator.time.$touch()"></date-time-picker>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <i-button
      @click="onSubmit"
      type="primary"
      :disabled="!canCommit">提交
    </i-button>
  </div>

</template>

<script lang="ts" src="./form.ts">
</script>

<style lang="less" src="./form.less" scoped>
</style>
