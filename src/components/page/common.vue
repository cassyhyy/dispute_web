<template>
<div>
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="wrapper common">
    <div class="common-side">
      <div class="btn-list">
        <p class="btn-item">纠纷类型-医患纠纷</p>
        <el-form ref="form" label-position="top" label-width="80px">
          <el-form-item label="发生地点">
            <el-row :gutter="0">
              <el-col :span="12">
                <el-select v-model="value" clearable placeholder="省名" class="select-tool">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select v-model="value" clearable placeholder="市名" class="select-tool">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="简要情况">
            <el-input placeholder="简要情况" type="textarea" :rows="3" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="案件点评">
            <el-input placeholder="案件点评" type="textarea" :rows="5" resize="none"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="large">查询相关案例</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="common-contain">
      <el-card class="search-result-card" shadow="hover">
        <div slot="header" class="search-result-title">
          <router-link class="title" :to="{name: 'detail'}">卡片名称</router-link>
        </div>
        <div class="search-result-info">
          一些内容
        </div>
        <div class="search-result-text">
          {{'列表内容 '}}
        </div>
      </el-card>
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
.wrapper.common{position:relative;min-height:800px;top:60px;bottom:0;width:100%;background:url(../../assets/img/index-back-8.jpg) top left no-repeat;background-size:cover;}
.common .common-side{position:fixed;left:0;bottom:0;top:60px;width:30%;padding:40px 60px;background: rgba(0, 59, 112, 0.5);box-sizing:border-box;}
.common .common-side .btn-list{width:100%;font-size:24px;}
.common .common-side .btn-list .btn-item{display:block;height:48px;line-height:48px;text-decoration:none;color:#fff;}
.common .common-side .btn-list .btn-item:active{color:#eee;}
.common .common-contain{position: relative;margin-left:30%;padding:50px 120px;box-sizing: border-box;}
.common .common-contain .common-detail{width:100%;background:#fff;min-height:100px;padding:30px 50px;box-sizing:border-box;}
.common .common-contain .common-detail .tip{color:#999;margin-bottom:20px;}
.common .common-contain .common-detail .select-tool{margin-right:12px;}
.common .common-contain .common-detail .tag-title{line-height:16px;font-size:16px;}
.common .common-contain .common-detail .tag-info .input-new-tag{width: 90px;margin-left: 10px;vertical-align: bottom;}
.common .common-contain .common-detail .tag-info .button-new-tag{margin-left: 10px;height: 32px;line-height: 30px;padding-top: 0;padding-bottom: 0;}
.common .common-contain .common-detail .tag-info .el-tag + .el-tag{margin-left: 10px;}
.common .common-side .el-form-item__label{font-size:18px;color:#fff;line-height:18px;}
.common .common-side .select-tool{margin-right:12px;}
.large{width:100%;}
.common .search-result-card{width:100%;margin-bottom:30px;cursor: pointer;}
.common .search-result-card:hover{transform: translateY(-5px);}
.common .search-result-title{font-size:18px;}
.common .title{display:inline-block;color:#347bd8;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-decoration: none;}
.common .title:hover{color:#2466bb;text-decoration: none;}
.common .search-result-info{padding-bottom:6px;border-bottom:1px dotted #eaeaea;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.common .search-result-text{padding-top:6px;position:relative;line-height:25px;max-height:75px;width:100%;overflow:hidden;}
</style>
