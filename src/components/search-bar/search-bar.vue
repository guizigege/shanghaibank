<template>
  <div class="search">
    <div class="search_bar_form">
      <div class="search_bar_box">
        <icon
          class="search_icon_in_box"
          type="search"
          size="14"></icon>
        <input type="text"
          class="search_bar_input"
          :placeholder="placeholder"
          :focus="showed"
          v-model="value"
          @input="onInput" />
        <div
          class="search_icon_clear"
          v-if="value.length > 0"
          @click="onClear">
          <icon
            type="clear"
            size="14"></icon>
        </div>
      </div>
      <!-- <label
        class="search_bar_label"
        :hidden="showed"
        @click="onClickSearch">
        <icon
          class="search_icon"
          type="search"
          size="14"></icon>
        <div class="search_bar_text">{{ placeholder }}</div>
      </label> -->
    </div>

  </div>
</template>

<script lang="ts" src="./search-bar.ts">
</script>

<style lang="less">
@import "./search-bar";
</style>
