<!-- 产品（优品/活动）表单 -->
<template>
  <div>
    <i-panel>
      <div class="title required">{{ productTypeName }}信息</div>

      <div class="form-group">
        <i-input
          :error="validator.title.$invalid"
          :value="vm.title"
          @change="vm.title = $event.mp.detail.detail.value; validator.title.$touch()"
          title="名称"
          maxlength="20"
          placeholder="请输入名称"/>
        <div
          class="error"
          v-if="validator.title.$anyError">
          <span v-if="!validator.title.required">请输入名称</span>
          <span v-if="!validator.title.minLength">不能少于 2 个字符</span>
        </div>
      </div>

      <div class="form-group">
        <i-input
          @change="vm.content = $event.mp.detail.detail.value; validator.content.$touch()"
          :value="vm.content"
          title="描述"
          maxlength="400"
          placeholder="请输入描述"/>
        <div
          class="error"
          v-if="validator.content.$anyError">
          <span v-if="!validator.content.required">请输入描述</span>
        </div>
      </div>

      <div class="form-group upload">
        <uploader
          v-if="isLoaded"
          :urls="vm.otherUrl"
          :maxFilesLength="3"
          @remove="onRemoveOtherUrl($event)"
          @uploaded="onUploadOtherUrl($event)"></uploader>
      </div>
    </i-panel>

    <i-panel>
      <div class="title">礼品信息</div>

      <div class="form-group">
        <i-input
          :value="vm.groupGift.name"
          @change="vm.groupGift.name = $event.mp.detail.detail.value; validator.groupGift.name.$touch()"
          title="拼团礼品名称"
          placeholder="请输入拼团业务礼品名称"/>
        <div class="error" v-if="validator.groupGift.name.$anyError">
          <span v-if="!validator.groupGift.name.maxLength">不能超过10个字符</span>
        </div>
      </div>

      <div class="form-group">
        <i-input
          @change="vm.groupGift.desc = $event.mp.detail.detail.value;"
          :value="vm.groupGift.desc"
          maxlength="200"
          title="拼团礼品描述"
          placeholder="请输入拼团业务礼品描述"/>
      </div>

      <div class="form-group upload">
        <uploader
          v-if="isLoaded"
          :urls="vm.groupGift.imageUrl"
          :maxFilesLength="3"
          @remove="onRemoveGift($event, 'groupGift')"
          @uploaded="onUploadGift($event, 'groupGift')"></uploader>
      </div>

      <div class="form-group">
        <i-input
          :value="vm.personalGift.name"
          @change="vm.personalGift.name = $event.mp.detail.detail.value;"
          title="个人礼品名称"
          placeholder="请输入个人业务礼品名称"/>
        <div class="error" v-if="validator.personalGift.name.$anyError">
          <span v-if="!validator.personalGift.name.maxLength">不能超过10个字符</span>
        </div>
      </div>

      <div class="form-group">
        <i-input
          @change="vm.personalGift.desc = $event.mp.detail.detail.value;"
          :value="vm.personalGift.desc"
          maxlength="200"
          title="个人礼品描述"
          placeholder="请输入个人业务礼品描述"/>
      </div>

      <div class="form-group upload">
        <uploader
          v-if="isLoaded"
          :urls="vm.personalGift.imageUrl"
          :maxFilesLength="3"
          @remove="onRemoveGift($event, 'personalGift')"
          @uploaded="onUploadGift($event, 'personalGift')"></uploader>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">有效周期</div>
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
          <div class="i-input-title">结束时间</div>
          <date-time-picker
            :mode="'time'"
            :value="vm.endTime"
            @change="vm.endTime = $event; validator.endTime.$touch()"
            @cancel="validator.endTime.$touch()"></date-time-picker>
        </div>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">拼团设置</div>
      <div class="form-group">
        <div class="i-cell i-input">
          <div class="i-input-title">拼团周期</div>
          <i-input-number
            @change="vm.groupTime = $event.mp.detail.value; validator.groupTime.$touch()"
            :value="vm.groupTime"
            min="0"
            max="100"/>
          <div class="i-input-title">（小时）</div>
          <div
            class="error"
            v-if="validator.groupTime.$anyError">
            <span v-if="!validator.groupTime.required">请设置单个拼团周期时长</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="i-cell i-input">
          <div class="i-input-title">拼团人数</div>
          <i-input-number
            @change="vm.groupSum = $event.mp.detail.value; validator.groupSum.$touch()"
            :value="vm.groupSum"
            min="0"
            max="100"/>
          <div class="i-input-title">人</div>
          <div
            class="error"
            v-if="validator.groupSum.$anyError">
            <span v-if="!validator.groupSum.required">请输入拼团人数</span>
          </div>
        </div>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">客户经理</div>
      <div class="form-group">
        <div class="i-cell i-input">
          <picker
            range-key="manager"
            @change="onManagerChange"
            :value="index"
            :range="managerList">
            <div class="i-input-title">选择 {{ selectedManager }}</div>
          </picker>
        </div>
      </div>
    </i-panel>
  </div>
</template>

<script lang="ts" src="./product-form.ts">
</script>

<style lang="less">
  @import "../../../../styles/form.less";
</style>
