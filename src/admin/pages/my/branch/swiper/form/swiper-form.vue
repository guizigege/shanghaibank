<!-- 轮播详情 -->
<template>
  <div class="content">
    <i-panel>
      <div class="form-group">
        <i-input
          :error="validator.name.$invalid"
          :value="vm.name"
          @change="vm.name = $event.mp.detail.detail.value; validator.name.$touch()"
          title="名称"
          name="名称"
          placeholder="请输入名称" />
        <div
          class="error"
          v-if="validator.name.$anyError">
          <span v-if="!validator.name.required">请输入名称</span>
          <span v-if="!validator.name.minLength">不能少于 2 个字符</span>
        </div>
      </div>

      <i-panel>
        <div class="title required">封面图</div>
        <div class="form-group">
          <div class="i-cell i-input">
            <uploader
              v-if="isLoaded"
              :urls="vm.imageUrl"
              :maxFilesLength="1"
              @remove="onRemoveImageUrl($event)"
              @uploaded="onUploadImageUrl($event)">
            </uploader>
          </div>
        </div>
      </i-panel>

      <i-panel>
        <div class="title required">支行网点</div>
        <div class="form-group">
          <div class="i-cell i-input">
            <picker
              @change="onOfficeChange"
              :value="officeIndex"
              :range="officeList">
              <div class="i-input-title">选择 {{ officeList[officeIndex] }}</div>
            </picker>
          </div>
        </div>
      </i-panel>

      <i-panel>
        <div class="title">优品活动</div>
        <div class="form-group">
          <div class="i-cell i-input">
            <picker
              range-key="title"
              @change="onProductChange"
              :value="productIndex"
              :range="productList">
              <div class="i-input-title">选择 {{ selectedProduct }}</div>
            </picker>
          </div>
        </div>
      </i-panel>

      <i-panel>
        <div class="title required">发布周期</div>
        <div class="form-group">
          <div class="i-cell i-input">
            <div class="i-input-title">开始日期</div>
            <date-time-picker
              :mode="'date'"
              :value="vm.beginDate"
              @change="vm.beginDate = $event; validator.beginDate.$touch()"
              @cancel="validator.beginDate.$touch()"></date-time-picker>
          </div>
        </div>

        <div class="form-group">
          <div class="i-cell i-input">
            <div class="i-input-title">开始时间</div>
            <date-time-picker
              :mode="'time'"
              :value="vm.beginTime"
              @change="vm.beginTime = $event; validator.beginTime.$touch()"
              @cancel="validator.beginTime.$touch()"></date-time-picker>
          </div>
        </div>

        <div class="form-group">
          <div class="i-cell i-input">
            <div class="i-input-title">结束日期</div>
            <date-time-picker
              :mode="'date'"
              :value="vm.endDate"
              @change="vm.endDate = $event; validator.endDate.$touch()"
              @cancel="validator.endDate.$touch()"></date-time-picker>
          </div>
        </div>

        <div class="form-group">
          <div class="i-cell i-input">
            <div class="i-input-title">开始时间</div>
            <date-time-picker
              :mode="'time'"
              :value="vm.endTime"
              @change="vm.endTime = $event; validator.endTime.$touch()"
              @cancel="validator.endTime.$touch()"></date-time-picker>
          </div>
        </div>
      </i-panel>

      <div class="form-group">
        <div class="i-cell i-input">
          <div class="i-input-title">优先级</div>
          <i-input-number
            @change="vm.index = $event.mp.detail.value; validator.index.$touch()"
            :value="vm.index"
            step="5"
            min="0"
            max="100" />
          <div
            class="error"
            v-if="validator.index.$anyError">
            <span v-if="!validator.index.required">请输入优先级</span>
          </div>
        </div>
      </div>
    </i-panel>

    <i-button
      @click="onSubmit"
      :disabled="validator.invalid"
      type="primary">提交</i-button>
  </div>
</template>

<script lang="ts" src="./swiper-form.ts"></script>

<style lang="less" scoped>
@import "../../../../../../styles/form.less";
</style>
