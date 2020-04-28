<!-- 支行网点 - 注册信息 -->
<template>
  <div>
    <i-toast id="toast" />

    <i-panel>
      <div class="title required">上传图片</div>
      <i-row>
        <i-col
          span="8"
          i-class="col-class upload">
          <uploader
            v-if="isLoaded"
            :urls="vm.avatar"
            @uploaded="onAfterUploaded"></uploader>
          头像
        </i-col>
      </i-row>
    </i-panel>

    <i-panel title="完善信息">
      <i-panel>
        <div class="title required">基本信息</div>
        <div class="form-group">
          <i-input
            :error="validator.bankName.$invalid"
            :value="vm.bankName"
            @change="onChange"
            autofocus
            type="text"
            maxlength="50"
            placeholder="网点名称" />
          <div
            class="error"
            v-if="validator.bankName.$anyError">
            <span v-if="!validator.bankName.required">请输入网点名称</span>
            <span v-if="!validator.bankName.minLength">不能少于 2 个字符</span>
          </div>
        </div>

        <i-panel>
          <div class="title required">营业时间</div>
          <i-row class="row-content form-group">
            <i-col
              span="24"
              offset="1">工作日</i-col>
            <i-col
              span="6"
              offset="2"
              i-class="col-class">上午</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.weekdayAmStartHour"
                @change="vm.weekdayAmStartHour = $event; validator.weekdayAmStartHour.$touch()"
                @cancel="validator.weekdayAmStartHour.$touch()"></date-time-picker>
            </i-col>
            <i-col
              span="4"
              i-class="col-class">~</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.weekdayAmEndHour"
                @change="vm.weekdayAmEndHour = $event; validator.weekdayAmEndHour.$touch()"
                @cancel="validator.weekdayAmEndHour.$touch()"></date-time-picker>
            </i-col>
          </i-row>
          <i-row class="row-content">
            <i-col
              span="6"
              offset="2"
              i-class="col-class">下午</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.weekdayPmStartHour"
                @change="vm.weekdayPmStartHour = $event; validator.weekdayPmStartHour.$touch()"
                @cancel="validator.weekdayPmStartHour.$touch()"></date-time-picker>
            </i-col>
            <i-col
              span="4"
              i-class="col-class">~</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.weekdayPmEndHour"
                @change="vm.weekdayPmEndHour = $event; validator.weekdayPmEndHour.$touch()"
                @cancel="validator.weekdayPmEndHour.$touch()"></date-time-picker>
            </i-col>
            <i-col
              span="24"
              offset="2">
              <div
                class="error"
                v-if="validator.weekdayAmStartHour.$anyError || validator.weekdayPmStartHour.$anyError || validator.weekdayAmEndHour.$anyError || validator.weekdayPmEndHour.$anyError">
                <span>请输入工作日时间</span>
              </div>
            </i-col>
          </i-row>
          <i-row class="row-content form-group">
            <i-col
              span="24"
              offset="1">节假日</i-col>
            <i-col
              span="6"
              offset="2"
              i-class="col-class">上午</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.holidayAmStartHour"
                @change="vm.holidayAmStartHour = $event; validator.holidayAmStartHour.$touch()"
                @cancel="validator.holidayAmStartHour.$touch()"></date-time-picker>
            </i-col>
            <i-col
              span="4"
              i-class="col-class">~</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.holidayAmEndHour"
                @change="vm.holidayAmEndHour = $event; validator.holidayAmEndHour.$touch()"
                @cancel="validator.holidayAmEndHour.$touch()"></date-time-picker>
            </i-col>
          </i-row>
          <i-row class="row-content">
            <i-col
              span="6"
              offset="2"
              i-class="col-class">下午</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.holidayPmStartHour"
                @change="vm.holidayPmStartHour = $event; validator.holidayPmStartHour.$touch()"
                @cancel="validator.holidayPmStartHour.$touch()"></date-time-picker>
            </i-col>
            <i-col
              span="4"
              i-class="col-class">~</i-col>
            <i-col
              span="6"
              i-class="col-class">
              <date-time-picker
                :mode="'time'"
                :value="vm.holidayPmEndHour"
                @change="vm.holidayPmEndHour = $event; validator.holidayPmEndHour.$touch()"
                @cancel="validator.holidayPmEndHour.$touch()"></date-time-picker>
            </i-col>
            <i-col
              span="24"
              offset="2">
              <div
                class="error"
                v-if="validator.holidayAmStartHour.$anyError || validator.holidayPmStartHour.$anyError || validator.holidayAmEndHour.$anyError || validator.holidayPmEndHour.$anyError">
                <span>请输入节假日时间</span>
              </div>
            </i-col>
          </i-row>
        </i-panel>
      </i-panel>
    </i-panel>

    <i-panel>
      <i-cell
        title="网点定位"
        @click="onSelectLocation"
        :value="location">
        <i-icon
          type="coordinates"
          slot="icon" />
      </i-cell>
    </i-panel>

    <i-row>
      <i-col
        span="12"
        i-class="col-class">
        <i-button
          i-class="btn"
          @click="onPrev"
          inline>上一步</i-button>
      </i-col>
      <i-col
        span="12"
        i-class="col-class">
        <i-button
          i-class="btn"
          :disabled="validator.$anyError"
          @click="onSubmit"
          inline
          type="primary">提交</i-button>
      </i-col>
    </i-row>
  </div>
</template>

<script lang="ts" src="./step-outlets.ts">
</script>

<style lang="less">
@import "../../../../../styles/form.less";
</style>
