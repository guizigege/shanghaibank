<template>
  <div>
    <i-cell-group>
      <i-cell title="头像">
        <i-avatar :src="avatar" size="large" slot="footer" @click="setAvatar"></i-avatar>
      </i-cell>
      <i-cell :title="nameTitle" is-link :url="AppUrls.CLIENT_MY_INFO_NICK" :value="loginInfo.userName"></i-cell>
      <i-cell title="一句话描述" is-link :url="AppUrls.CLIENT_MY_INFO_DESC">
        <view slot="footer" class="cell-footer">{{loginInfo.desc}}</view>
      </i-cell>
      <i-cell title="性别" @click="setGender" :value="gender[loginInfo.gender]"></i-cell>
      <i-cell title="生日">
        <picker
          mode="date"
          :value="birthday"
          start="1900-01-01"
          :end="endDate"
          @change="bindDateChange"
          slot="footer"
        >
          <view class="picker">{{birthday}}</view>
        </picker>
      </i-cell>
      <i-cell title="婚姻" @click="setMarriage" :value="marriage[loginInfo.marriage]"></i-cell>
      <i-cell title="兴趣" is-link :url="AppUrls.CLIENT_MY_INFO_HOBBY"></i-cell>
    </i-cell-group>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .picker {
    width: 200px;
    height: 20px;
  }

  .cell-footer {
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
