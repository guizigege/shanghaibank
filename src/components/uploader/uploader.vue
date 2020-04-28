<template>
  <div class="cells cells_form">
    <div class="cell">
      <div class="cell_bd">
        <div class="uploader">
          <!-- <div class="uploader_hd">
            <p class="uploader_title">图片上传</p>
            <div class="uploader_info">0/2</div>
          </div>-->
          <div class="uploader_bd">
            <ul
              class="uploader_files"
              id="uploaderFiles">
              <li
                class="uploader_file"
                v-for="(item, index) in files"
                :key="item"
                :style="{ 'background-image':'url('+ item +')' }"
                @longpress="onLongPress(index)"
                @click="onPreview(item)"></li>
            </ul>
            <div
              class="uploader_input_box"
              v-if="files && files.length < maxFilesLength">
              <div
                id="uploaderInput"
                class="uploader_input"
                type="file"
                accept="image/*"
                @click="onUpload"></div>
              <i-spin
                v-if="uploading"
                fix
                custom>
                <view class="loading"></view>
              </i-spin>
            </div>
          </div>
        </div>
      </div>
    </div>

    <i-modal
      title="删除确认"
      :visible="visible"
      i-class="i-grid-item"
      @cancel="onCancel"
      @ok="onRemove">
      <view>删除后无法恢复哦</view>
    </i-modal>

    <i-toast id="toast" />
  </div>
</template>

<script lang="ts" src="./uploader.ts"></script>

<style lang="less">
@import "./uploader.less";
</style>
