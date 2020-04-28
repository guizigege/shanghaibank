<template>
  <div>
    <i-cell-group>
      <i-cell title="头像">
        <i-avatar :src="avatar" size="large" slot="footer" @click="setAvatar"></i-avatar>
      </i-cell>
      <!--暂时关闭网点、分行名称修改-->
      <i-cell :title="nameTitle" v-if="!isManager" :value="loginInfo.userName"></i-cell>
      <i-cell :title="nameTitle" v-if="isManager" is-link :url="nameUrl" :value="loginInfo.userName"></i-cell>
      <i-cell title="一句话描述" is-link :url="AppUrls.ADMIN_MY_INFO_DESC">
        <view slot="footer" class="cell-footer">{{loginInfo.desc}}</view>
      </i-cell>
      <i-cell title="性别" v-if="isManager" @click="setGender" :value="gender[loginInfo.gender]"></i-cell>
    </i-cell-group>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .cell-footer {
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
