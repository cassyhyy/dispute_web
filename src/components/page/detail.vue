<template>
<div>
<Nav :activeIndex="activeIndex"></Nav>
<div class="wrapper detail">
  <div class="detail-contain">
    <div class="title">文书名称</div>
    <div class="detail-list">
      <div class="sub-title">基本信息</div>
      <el-form ref="form" label-width="100px" label-position="left" class="detail-form">
        <el-form-item label="纠纷名称：" class="detail-info-item">
          <p>111111</p>
        </el-form-item>
        <el-form-item label="纠纷类型：" class="detail-info-item">
          <p>11111</p>
        </el-form-item>
        <el-form-item label="调解员：" class="detail-info-item">
          <p>111111</p>
        </el-form-item>
        <el-form-item label="发生地点：" class="detail-info-item">
          <p>11111</p>
        </el-form-item>
        <el-form-item label="责任单位：" class="detail-info-item">
          <p>11111</p>
        </el-form-item>
        <el-form-item label="标签：" class="detail-info-item">
          <p>1111</p>
        </el-form-item>
      </el-form>
    </div>
    <div class="detail-list">
      <div class="sub-title">简要情况</div>
      <p class="detail-brief">以下是简要信息</p>
    </div>
    <div class="detail-list">
      <div class="sub-title">调节结果</div>
      <p class="detail-brief">以下是简要信息</p>
    </div>
    <div class="detail-list">
      <div class="sub-title">案件点评</div>
      <p class="detail-brief">以下是简要信息</p>
    </div>
    <div class="detail-list">
      <div class="sub-title">适用法律</div>
      <p class="detail-brief">以下是简要信息</p>
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
      activeIndex: '3',
      type: 'name',
      placeholder: '请输入书籍名称',
      key: '' // 搜索关键词
    }
  },
  components: {
    Nav
  },
  methods: {
    changeType (type) {
      this.type = type
      if (type === 'name') {
        this.placeholder = '请输入书籍名称'
      } else if (type === 'author') {
        this.placeholder = '请输入书籍作者'
      } else {
        this.placeholder = '请输入书籍ISBN'
      }
    },
    search () {
      if (!this.key) {
        this.$message('请输入搜索关键词')
        return
      }
      this.$router.push({name: 'searchList', params: {key: this.key, type: this.type}})
    }
  }
}
</script>
<style>
.wrapper.detail{position:relative;min-height:800px;top:60px;bottom:0;width:100%;background:url(../../assets/img/index-back-8.jpg) top left no-repeat;background-size:cover;}
.detail .detail-contain{position: relative;margin-top:30px;width:80%;margin-left:10%;padding:30px;background:#fff;margin-bottom:30px;}
.detail .detail-contain .title{font-size:24px;color:#333;padding-bottom:8px;border-bottom:1px solid #e0e0e0;margin-bottom:10px;}
.detail .detail-contain .detail-list{border-bottom:1px solid #e0e0e0;margin-bottom:10px;}
.detail .detail-contain .detail-list:last-child{border-bottom:0;margin-bottom:10px;}
.detail .detail-contain .sub-title{font-size:18px;color:#575757;}
.detail .detail-contain .detail-form{margin-left:20px;}
.detail .detail-contain .detail-info-item{margin-bottom:0;}
.detail .detail-contain .detail-brief{margin:8px 20px;}
</style>
