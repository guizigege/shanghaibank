<template xmlns:wx="http://www.w3.org/1999/XSL/Transform">
  <div class="business-info" v-if="isLoad">
    <p>网点领奖</p>
    <!-- 拼团业务 -->
    <div v-if="!(group.name === '' && group.desc === '' && group.imageUrl === '')">
      <p>
        拼团业务：
        <span>{{ group.name }}</span>
      </p>
      <p class="desc">{{group.desc}}</p>
      <p>
        <img v-for="item in groupImageUrls"
             :key="item"
             :src="item"
             @click="onPreview(item, 'group')"
             alt>
      </p>
    </div>
    <!-- 个体业务 -->
    <div v-if="!(person.name === '' && person.desc === '' && person.imageUrl === '')">
      <p>
        个体业务：
        <span>{{ person.name }}</span>
      </p>
      <p class="desc">{{person.desc}}</p>
      <img v-for="item in personImageUrls"
           :key="item"
           :src="item"
           @click="onPreview(item, 'group')"
           alt>
    </div>
    <div class="red-page">
      <div class="time">
        <span v-if="timeShow && canReceive">{{timeBack}}s</span>
      </div>
      <div class="red-wrap" v-if="(!timeShow && hasRedPage) || (hasRedPage && !canReceive)">
        <template v-for="(item, index) in detail.red" wx:key="item">
          <i-icon v-if="index === 0" @click="emitRedIndex(index)" type="redpacket_fill"
                  :color="item.hasGedRed ? '#ddd' : 'red'"
                  size="30"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./business-info.ts"></script>

<style lang="less" scoped>
  @import "./business-info.less";
</style>
