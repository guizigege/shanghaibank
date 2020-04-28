<template>
  <div>
    <div class="container">
      <div class="title">营业时间</div>
      <div class="row-content">
        <div class="row-title">工作日</div>
        <div class="row-time">
          <i-col
            span="6"
            offset="2"
            i-class="col-class">上午
          </i-col>
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
            i-class="col-class">~
          </i-col>
          <i-col
            span="6"
            i-class="col-class">
            <date-time-picker
              :mode="'time'"
              :value="vm.weekdayAmEndHour"
              @change="vm.weekdayAmEndHour = $event; validator.weekdayAmEndHour.$touch()"
              @cancel="validator.weekdayAmEndHour.$touch()"></date-time-picker>
          </i-col>
        </div>
        <i-row>
          <i-col
            span="6"
            offset="2"
            i-class="col-class">下午
          </i-col>
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
            i-class="col-class">~
          </i-col>
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
      </div>
      <div class="row-content">
        <div class="row-title">节假日</div>
        <div class="row-time">
          <i-col
            span="6"
            offset="2"
            i-class="col-class">上午
          </i-col>
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
            i-class="col-class">~
          </i-col>
          <i-col
            span="6"
            i-class="col-class">
            <date-time-picker
              :mode="'time'"
              :value="vm.holidayAmEndHour"
              @change="vm.holidayAmEndHour = $event; validator.holidayAmEndHour.$touch()"
              @cancel="validator.holidayAmEndHour.$touch()"></date-time-picker>
          </i-col>
        </div>
        <i-row>
          <i-col
            span="6"
            offset="2"
            i-class="col-class">下午
          </i-col>
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
            i-class="col-class">~
          </i-col>
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
      </div>
    </div>
    <i-panel>
      <i-button @click="submitInfo" :disabled="validator.$invalid" type="primary">提交</i-button>
    </i-panel>
    <i-toast id="toast" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .container {
    padding: 20px;
    background-color: #fff;
  }

  .title {
    width: 100%;
    padding: 10px 20px 10px;
    font-size: 16px;
    border-bottom: 1px solid #f5f5f5;
  }

  .row-content {
    width: 100%;
    margin-bottom: 10px;

    .row-title{
      font-size: 16px;
      margin-bottom: 10px;
    }

    .row-time{
      margin-bottom: 10px;
      overflow: hidden;
    }
  }
</style>
