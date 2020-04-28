<template>
  <div>
    <i-cell-group v-if="isBranch">
      <i-cell title="手机号码" is-link :url="AppUrls.ADMIN_MY_SETTING_CONTACT" :value="mobile"></i-cell>
      <i-cell title="起发金额" @click="setSome('起发金额')" :value="money"></i-cell>
      <i-cell title="红包均额" @click="setSome('红包均额')" :value="average"></i-cell>
      <i-cell title="日领上限" @click="setSome('日领上限')" :value="limit"></i-cell>
      <i-cell title="上限额度" @click="setSome('上限额度')" :value="limitSet"></i-cell>
      <!--<i-cell title="奖励设置" is-link :url="AppUrls."></i-cell>-->
      <i-cell title="重复限制" is-link :url="AppUrls.ADMIN_MY_SETTING_REPEAT_LIMIT"></i-cell>
      <i-cell title="佣金比例" @click="setSome('佣金比例')" :value="rate"></i-cell>
    </i-cell-group>
    <i-cell-group v-if="isOffice">
      <i-cell title="网点封面" @click="setCoverUrl">
        <i-avatar v-if="coverUrl !== '0'" :src="coverUrl" size="large" slot="footer"></i-avatar>
        <span v-else slot="footer">未上传</span>
      </i-cell>
      <i-cell title="业务简介" is-link :url="AppUrls.ADMIN_MY_SETTING_BUSINESS_INTRO" :value="abstract"></i-cell>
      <i-cell title="营业时间" is-link :url="AppUrls.ADMIN_MY_SETTING_BUSINESS_HOURS"></i-cell>
      <i-cell title="手机号码" is-link :url="AppUrls.ADMIN_MY_SETTING_CONTACT" :value="mobile"></i-cell>
      <i-cell title="微信号" is-link :url="AppUrls.ADMIN_MY_SETTING_WX" :value="wxNumber"></i-cell>
    </i-cell-group>
    <i-cell-group v-if="isManager">
      <i-cell title="职业亮点" is-link :url="AppUrls.ADMIN_MY_SETTING_CAREER_HIGHLIGHTS"></i-cell>
      <i-cell title="个人观点" is-link :url="AppUrls.ADMIN_MY_SETTING_PERSONAL_OPINION"></i-cell>
      <i-cell title="推荐产品" is-link :url="AppUrls.ADMIN_MY_SETTING_RECOMMEND_PRODUCTS"></i-cell>
      <i-cell title="我 · 生活" is-link :url="AppUrls.ADMIN_MY_SETTING_MY_LIFE"></i-cell>
      <i-cell title="所属网点" :value="office"></i-cell>
    </i-cell-group>
    <i-toast id="toast"/>
    <i-modal :title="current" :visible="showModal" @ok="okEvent" @cancel="closeModal">
      <view v-if="current === '起发金额'">
        <i-input :value="red.money" type="number" @change="setRedValue(1, $event)" autofocus :placeholder="current"/>
        <view>单位：元</view>
      </view>
      <view v-if="current === '红包均额'">
        <i-input :value="red.average" type="number" @change="setRedValue(2, $event)" autofocus :placeholder="current"/>
        <view>单位：元</view>
      </view>
      <view v-if="current === '日领上限'">
        <i-input :value="red.limit" type="number" @change="setRedValue(3, $event)" autofocus :placeholder="current"/>
        <view>单位：个</view>
      </view>
      <view v-if="current === '上限额度'">
        <i-input title="上限金额" type="number" @change="setRedValue(4, $event)" :value="red.limitMoney"/>
        <i-input title="间隔天数" type="number" @change="setRedValue(5, $event)" :value="red.IntervalDays"/>
      </view>
      <view v-if="current === '佣金比例'">
        <i-input :value="red.rate" type="number" @change="setRedValue(6, $event)" autofocus :placeholder="current"/>
        <view>单位：%</view>
      </view>
    </i-modal>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
  .i-cell-ft {
    width: 200px;
    overflow: hidden;
  }
</style>
