<template>
  <div class="career-highights">
    <div class="career-highight-title">
      <p>Career Highights</p>
      <p>职业亮点</p>
    </div>
    <div class="career-highight-msg">
      <p><span class="line"></span>{{ manager.ex.userInfo.highlights }}</p>
    </div>
  </div>
</template>

<script lang="ts" src="./career-highlights.ts"></script>

<style lang="less">
  @import './career-highlights.less';
</style>
