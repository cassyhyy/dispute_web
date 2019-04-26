<template>
<div>
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="wrapper common">
    <div class="common-side">
      <div class="btn-list">
        <p class="btn-item">纠纷类型-医患纠纷</p>
        <el-form ref="form" label-position="top" label-width="80px">
          <el-form-item label="简要情况">
            <el-input placeholder="简要情况" v-model="brief" type="textarea" :rows="8" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <div class="tag-info">
              <p class="tip">*点击标签可自定义标签顺序</p>
              <el-tag
                :key="index"
                v-for="(item, index) in tags"
                closable
                :disable-transitions="false"
                @click="changeTagIndex(item)"
                @close="handleClose(item)">
                {{item}}
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
          </el-form-item>
          <el-form-item>
            <el-button class="large" type="primary" @click="getTag">根据简要情况获取标签</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="large" @click="search">根据标签查询相关案例</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="common-contain">
      <el-card class="search-result-card" shadow="hover" v-for="(item, index) in list" :key="index">
        <div slot="header" class="search-result-title">
          <router-link class="title" :to="{name: 'detail', params: {id: item.id}}">{{item.disputeName}}</router-link>
        </div>
        <div class="search-result-info">
          {{item.disputeResolution}}
        </div>
        <div class="search-result-text">
          {{item.briefInfo}}
        </div>
      </el-card>
      <el-card class="search-result-card" shadow="hover" v-if="!total">
        <div class="search-result-text center">
          暂无内容
        </div>
      </el-card>
      <el-pagination
        v-if="limit < total"
        class="page"
        :page-size="limit"
        :pager-count="5"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import Nav from '@/components/common/header'
import {Api} from '@/Api/index'
export default {
  data () {
    return {
      activeIndex: '2',
      placeholder: '请输入书籍名称',
      inputVisible: false,
      inputValue: '',
      tags: [],
      brief: '',
      page: 0,
      limit: 10,
      total: 0, // 结果总数
      list: []
    }
  },
  components: {
    Nav
  },
  methods: {
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue && this.tags.indexOf(inputValue) === -1) {
        this.tags.push(inputValue)
      } else if (inputValue && this.tags.indexOf(inputValue) !== -1) {
        this.$message('标签内容重复，请重新输入')
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    changeTagIndex (item) {
      this.$prompt('请输入不小于0的数字，数字越小，排列越前', '标签顺序', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]/,
        inputErrorMessage: '请输入不小于0的数字'
      }).then(({ value }) => {
        if (this.tags.length < Number(value)) {
          this.tags.splice(this.tags.indexOf(item), 1)
          this.tags.push(item)
        } else {
          this.tags.splice(this.tags.indexOf(item), 1)
          if (Number(value) > 0) {
            this.tags.splice(Number(value) - 1, 0, item)
          } else {
            this.tags.splice(0, 0, item)
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    async getTag () {
      let res = await this.getTagByContent()
      if (res && res.success) {
        this.tags = res.data
      }
    },
    getTagByContent () {
      let that = this
      if (!that.brief) {
        this.$message('请输入简要信息')
        return
      }
      return new Promise((resolve, reject) => {
        resolve(Api('text/getKeyword', {content: that.brief}))
      })
    },
    async search () {
      let res = await this.getListByKey()
      if (res && res.success) {
        this.$message('查询成功！')
        this.list = res.data.list
        this.total = res.data.total
      } else {
        this.$message('查询失败，请重试')
      }
    },
    getListByKey () {
      let that = this
      if (that.tags.length === 0) {
        this.$message('请输入标签')
        return
      }
      return new Promise((resolve, reject) => {
        resolve(Api('es/searchByKeyword', {keyword: that.tags, page: that.page, limit: that.limit}))
      })
    },
    // 页面切换
    handleCurrentChange (val) {
      this.page = val - 1
      this.search()
    }
  }
}
</script>
<style>
.wrapper.common{position:relative;min-height:800px;bottom:0;width:100%;background:url(../../assets/img/index-back-8.jpg) top left no-repeat;background-size:cover;}
.common .common-side{position:fixed;left:0;bottom:0;top:60px;width:30%;padding:40px 60px;background: rgba(0, 59, 112, 0.5);box-sizing:border-box;}
.common .common-side .btn-list{width:100%;font-size:24px;}
.common .common-side .btn-list .btn-item{display:block;height:48px;line-height:48px;text-decoration:none;color:#fff;}
.common .common-side .btn-list .btn-item:active{color:#eee;}
.common .common-contain{position: relative;margin-left:30%;padding:110px 120px 50px 120px;box-sizing: border-box;}
.common .common-side .el-form-item__label{font-size:18px;color:#fff;line-height:18px;}
.large{width:100%;}
.common .search-result-card{width:100%;margin-bottom:30px;cursor: pointer;}
.common .search-result-card:hover{transform: translateY(-5px);}
.common .search-result-title{font-size:18px;}
.common .title{display:inline-block;color:#347bd8;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-decoration: none;}
.common .title:hover{color:#2466bb;text-decoration: none;}
.common .search-result-info{padding-bottom:6px;border-bottom:1px dotted #eaeaea;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:#db2929;text-decoration:none;}
.common .search-result-text{padding-top:6px;position:relative;line-height:25px;max-height:75px;width:100%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.common .search-result-text.center{text-align:center;}
.common .common-side .tag-info .tip{line-height:16px;font-size:12px;color:#d4d4d4;}
.common .common-side .tag-info .input-new-tag{width: 90px;vertical-align:middle;}
.common .common-side .tag-info .button-new-tag{height: 32px;line-height: 30px;padding-top: 0;padding-bottom: 0;vertical-align: middle;}
.common .common-side .tag-info .el-tag{background:#fff;cursor: pointer;margin-right: 10px;}
</style>
