<template>
<div>
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="wrapper enter">
    <div class="enter-side">
      <div class="btn-list">
        <a class="btn-item">重新录入</a>
        <a class="btn-item" href="#info">文书信息</a>
        <a class="btn-item" href="#tag">查看标签</a>
        <a class="btn-item">提交文书</a>
      </div>
    </div>
    <div class="enter-contain">
      <div class="enter-detail" id="info">
        <p class="tip">*请根据描述填写相关信息并录入文书。</p>
        <el-form ref="form" label-width="80px">
          <el-form-item label="纠纷名称">
            <el-input placeholder="纠纷名称"></el-input>
          </el-form-item>
          <el-form-item label="纠纷类型">
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调解员">
            <el-input placeholder="调解员"></el-input>
          </el-form-item>
          <el-form-item label="发生地点">
            <el-row :gutter="0">
              <el-col :span="6">
                <el-select v-model="value" clearable placeholder="省名" class="select-tool">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="value" clearable placeholder="市名" class="select-tool">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12"><el-input placeholder="详细地址"></el-input></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="责任单位">
            <el-input placeholder="责任单位"></el-input>
          </el-form-item>
          <el-form-item label="简要情况">
            <el-input placeholder="简要情况" type="textarea" :rows="5" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="调节结果">
            <el-input placeholder="调节结果" type="textarea" :rows="5" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="案件点评">
            <el-input placeholder="案件点评" type="textarea" :rows="5" resize="none"></el-input>
          </el-form-item>
          <el-form-item>
            <el-card class="tag-card" shadow="hover" id="tag">
              <div slot="header" class="tag-title">标签</div>
              <div class="tag-info">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Nav from '@/components/common/header'
export default {
  data () {
    return {
      activeIndex: '1',
      placeholder: '请输入书籍名称',
      key: '', // 搜索关键词
      options: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      value: '',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  components: {
    Nav
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style>
.wrapper.enter{position:relative;min-height:800px;top:60px;bottom:0;width:100%;background:url(../../assets/img/index-back-8.jpg) top left no-repeat;background-size:cover;}
.enter .enter-side{position: fixed;left:0;bottom:0;top:60px;width:20%;background: rgba(0, 59, 112, 0.5);}
.enter .enter-side .btn-list{position:absolute;top:50%;margin-top:-96px;color:#fff;width:100%;text-align:center;font-size:24px;}
.enter .enter-side .btn-list .btn-item{display:block;height:48px;line-height:48px;text-decoration:none;color:#fff;}
.enter .enter-side .btn-list .btn-item:active{color:#eee;}
.enter .enter-contain{position: relative;margin-left:20%;padding:50px 120px;box-sizing: border-box;}
.enter .enter-contain .enter-detail{width:100%;background:#fff;min-height:100px;padding:30px 50px;box-sizing:border-box;}
.enter .enter-contain .enter-detail .tip{color:#999;margin-bottom:20px;}
.enter .enter-contain .enter-detail .select-tool{margin-right:12px;}
.enter .enter-contain .enter-detail .tag-title{line-height:16px;font-size:16px;}
.enter .enter-contain .enter-detail .tag-info .input-new-tag{width: 90px;margin-left: 10px;vertical-align: bottom;}
.enter .enter-contain .enter-detail .tag-info .button-new-tag{margin-left: 10px;height: 32px;line-height: 30px;padding-top: 0;padding-bottom: 0;}
.enter .enter-contain .enter-detail .tag-info .el-tag + .el-tag{margin-left: 10px;}
</style>
