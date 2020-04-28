<!-- 客户经理 - 注册信息 -->
<template>
  <div class="sign-up">
    <i-toast id="toast" />

    <i-panel>
      <div class="title required">上传图片</div>
      <i-row v-if="isLoaded">
        <i-col
          span="8"
          i-class="col-class upload">
          <uploader :urls="vm.avatarUrl" @uploaded="onAfterUploaded($event, 'avatarUrl')"></uploader>头像
        </i-col>
        <i-col
          span="8"
          i-class="col-class upload">
          <uploader :urls="vm.bigFrontCoverUrl" @uploaded="onAfterUploaded($event, 'bigFrontCoverUrl')"></uploader>大封面
        </i-col>
        <i-col
          span="8"
          i-class="col-class upload">
          <uploader :urls="vm.frontCoverUrl" @uploaded="onAfterUploaded($event, 'frontCoverUrl')"></uploader>小封面
        </i-col>
      </i-row>
    </i-panel>

    <i-panel>
      <div class="title required">基本信息</div>

      <div class="form-group">
        <div class="input-wrap">
          <i-input
            :error="validator.name.$invalid"
            :value="vm.name"
            @change="vm.name = $event.mp.detail.detail.value; validator.name.$touch()"
            title="姓名"
            autofocus
            placeholder="请输入客户经理姓名"
            :maxlength="limit10"/>
          <div class="limit-tip">{{vm.name.length}}/{{limit10}}</div>
        </div>

        <div
          class="error"
          v-if="validator.name.$anyError">
          <span v-if="!validator.name.required">请输入分行名称</span>
          <span v-if="!validator.name.minLength">不能少于 2 个字符</span>
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <i-input
            @change="vm.signature = $event.mp.detail.detail.value; validator.signature.$touch()"
            :value="vm.signature"
            title="签名"
            placeholder="请输入签名"
            :maxlength="limit10"/>
          <div class="limit-tip">{{vm.signature.length}}/{{limit10}}</div>
        </div>

        <div
          class="error"
          v-if="validator.signature.$anyError">
          <span v-if="!validator.signature.required">请输入签名</span>
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <i-input
            @change="vm.desc = $event.mp.detail.detail.value; validator.desc.$touch()"
            :value="vm.desc"
            title="描述"
            placeholder="一句话描述"
            :maxlength="limit25"/>
          <div class="limit-tip">{{vm.desc.length}}/{{limit25}}</div>
        </div>

        <div
          class="error"
          v-if="validator.desc.$anyError">
          <span v-if="!validator.desc.required">请输入描述</span>
        </div>
      </div>

      <div class="form-group">
        <div class="i-cell i-input">
          <picker
            range-key="name"
            @change="onGenderChange"
            :value="index"
            :range="gender">
            <div class="i-input-title">选择性别 {{ gender[index].name }}</div>
          </picker>
        </div>
      </div>

      <div class="form-group">
        <div class="i-cell i-input">
          <picker
            @change="onBusinessChange"
            :value="businessTypesIndex"
            :range="businessTypes"
            :range-key="'content'">
            <div class="i-input-title">
              业务方向
              {{ businessTypes[businessTypesIndex].content }}
            </div>
          </picker>
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <i-input
            @change="vm.title = $event.mp.detail.detail.value; validator.title.$touch()"
            :value="vm.title"
            title="职称"
            placeholder="请输入工作职称"
          :maxlength="limit10"/>
          <div class="limit-tip">{{vm.title.length}}/{{limit10}}</div>
        </div>

        <div
          class="error"
          v-if="validator.title.$anyError">
          <span v-if="!validator.title.required">请输入工作职称</span>
        </div>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">添加标签(3 ~ 6 个)</div>
      <div class="form-group">
        <div class="i-cell i-input" style="flex-wrap: wrap">
          <i-tag
            class="tag"
            v-for="tag in vm.tags"
            :key="tag">
            {{ tag }}
            <i-icon
              type="close"
              @click="onRemoveTag(tag)" />
          </i-tag>
        </div>

        <i-row v-if="vm.tags.length < 6">
          <i-col
            span="22"
            i-class="col-class">
            <div class="input-wrap">
              <i-input
                @change="onNewTagChange"
                :value="newTag"
                type="text"
                maxlength="50"
                placeholder="请输入标签名称"
              :maxlength="limit10"/>
              <div class="limit-tip">{{newTag.length}}/{{limit10}}</div>
              <i-col
                span="2"
                i-class="col-class">
                <i-icon
                  size="28"
                  type="add"
                  @click="onAddTag" />
              </i-col>
            </div>


          </i-col>

          <i-col
            span="24"
            offset="2">
            <div
              class="error"
              v-if="validator.tags.$anyError">
              <span>请输入 3 ~ 6 标签名称</span>
            </div>
          </i-col>
        </i-row>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">联系方式</div>
      <div class="form-group">
        <i-input
          @change="vm.mobilePhone = $event.mp.detail.detail.value; validator.mobilePhone.$touch()"
          :value="vm.mobilePhone"
          type="text"
          title="手机号码"
          maxlength="50"
          placeholder="请输入手机号码" />
        <div
          class="error"
          v-if="validator.mobilePhone.$anyError">
          <span v-if="!validator.mobilePhone.required">请输入手机号码</span>
          <span v-if="!validator.mobilePhone.phoneNumber">请输入有效的手机号码</span>
        </div>
      </div>

      <div class="form-group">
        <i-input
          @change="vm.wxNumber = $event.mp.detail.detail.value; validator.wxNumber.$touch()"
          :value="vm.wxNumber"
          type="text"
          title="微信号码"
          maxlength="50"
          placeholder="请输入常登录微信号" />
        <div
          class="error"
          v-if="validator.wxNumber.$anyError">
          <span v-if="!validator.wxNumber.required">请输入常登录微信号</span>
        </div>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">职业亮点</div>
      <div class="form-group">
        <i-input
          @change="vm.highlights = $event.mp.detail.detail.value; validator.highlights.$touch()"
          :value="vm.highlights"
          type="textarea"
          maxlength="200"
          placeholder="编辑您的职业亮点吧" />
        <div
          class="error"
          v-if="validator.highlights.$anyError">
          <span v-if="!validator.highlights.required">请编辑您的职业亮点</span>
        </div>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">个人观点</div>
      <div class="form-group">
        <i-input
          @change="vm.viewpoint = $event.mp.detail.detail.value; validator.viewpoint.$touch()"
          :value="vm.viewpoint"
          type="textarea"
          maxlength="200"
          placeholder="开始发表您的观点吧" />
        <div
          class="error"
          v-if="validator.viewpoint.$anyError">
          <span v-if="!validator.viewpoint.required">请编辑您的观点</span>
        </div>
      </div>
    </i-panel>

    <i-panel>
      <div class="title required">我的生活</div>
      <div class="form-group">
        <i-input
          @change="vm.life = $event.mp.detail.detail.value; validator.viewpoint.$touch()"
          :value="vm.life"
          type="textarea"
          maxlength="50"
          placeholder="写点生活感悟吧" />
        <div
          class="error"
          v-if="validator.life.$anyError">
          <span v-if="!validator.life.required">请编辑您的生活感悟</span>
        </div>
      </div>
      <uploader @uploaded="onAfterUploaded($event, 'photoUrl')"></uploader>
    </i-panel>

    <i-row>
      <i-col
        span="12"
        i-class="col-class">
        <i-button
          i-class="btn"
          @click="onPrev"
          inline>上一步</i-button>
      </i-col>
      <i-col
        span="12"
        i-class="col-class">
        <i-button
          i-class="btn"
          :disabled="validator.$anyError"
          @click="onSubmit"
          inline
          type="primary">提交</i-button>
      </i-col>
    </i-row>
  </div>
</template>

<script lang="ts" src="./step-manager-info.ts">
</script>

<style lang="less">
@import "../../../../../styles/form.less";

.tag {
  margin-right: 5px;
}
.sign-up .input-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sign-up .limit-tip {
  width:100px;
  min-height:22px;
  height:auto;
  line-height:1.6;
  font-size:14px;
  color:#ddd;
  padding:11px 15px;
  flex:1;
}

</style>
