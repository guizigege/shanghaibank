<template>
  <div class="select" >

      <div v-if="list.length===0">
        附近没有网点
      </div>
      <div  v-else>
        <picker @change="onSelectBank" @cancel="cancelSelect" :value="index" :range="list" range-key="office">
             <span @click="onShowSelect">
               {{office}}
              <i-icon
                type="unfold"
                size="22"
                color="#8a8a8a" :i-class="selected===true?'turnUp':'turnDown'"/>
              </span>
        </picker>
      </div>
  </div>
</template>

<script lang="ts" src="./select.ts"></script>


<style lang="less" scoped>
  @import './select.less';

</style>
<style lang="less">
  .turnUp{
    transform: rotateZ(180deg);
    transition:0.4s all;
  }
  .turnDown{
    transform: rotateZ(0deg);
    transition:0.4s all;
  }
</style>
