<template>
  <div class="content" v-if="loaded">
    <i-panel>
      <div class="title required">上传图片</div>
      <i-row>
        <i-col
          span="8"
          i-class="col-class upload">
          <uploader
            :urls="product.linkUrl"
            @uploaded="onAfterUploaded($event, 'linkUrl')"></uploader>
          封面
        </i-col>
        <i-col
          span="8"
          i-class="col-class upload">
          <uploader
            :urls="product.imageUrl"
            @uploaded="onAfterUploaded($event, 'imageUrl')"></uploader>
          banner
        </i-col>
      </i-row>
    </i-panel>

    <product-form></product-form>

    <i-row>
      <i-col
        span="8"
        i-class="col-class">
        <i-button
          @click="onPreview"
          i-class="btn"
          inline>预览
        </i-button>
      </i-col>
      <i-col
        span="8"
        i-class="col-class">
        <i-button
          @click="onSave"
          i-class="btn"
          inline>保存草稿
        </i-button>
      </i-col>
      <i-col
        span="8"
        i-class="col-class">
        <i-button
          @click="onSubmit"
          :disabled="invalid"
          type="primary">提交
        </i-button>
      </i-col>
    </i-row>
    <i-toast id="toast"/>
  </div>
</template>

<script lang="ts" src="./superior-form.ts">
</script>

<style>
</style>
