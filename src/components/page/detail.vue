<template>
<div class="wrapper">
<Nav :activeIndex="activeIndex"></Nav>
<div class="detail">
  <div class="detail-contain">
    <div class="title">{{detail.disputeName}}</div>
    <div class="detail-list">
      <div class="sub-title">基本信息</div>
      <el-form ref="form" label-width="90px" label-position="left" class="detail-form">
        <el-form-item label="纠纷类型：" class="detail-info-item">
          <p>{{detail.disputeType}}</p>
        </el-form-item>
        <el-form-item label="案情评估：" class="detail-info-item">
          <p>{{detail.evaluation}}</p>
        </el-form-item>
        <el-form-item label="激烈程度：" class="detail-info-item">
          <p>{{detail.fierceDegree}}</p>
        </el-form-item>
        <el-form-item label="受理时间：" class="detail-info-item">
          <p>{{detail.acceptDate}}</p>
        </el-form-item>
        <el-form-item label="纠纷等级：" class="detail-info-item">
          <p>{{detail.disputeDegree}}</p>
        </el-form-item>
        <el-form-item label="涉及人数：" class="detail-info-item">
          <p>{{detail.disputePerson}}人</p>
        </el-form-item>
        <el-form-item label="案件来源：" class="detail-info-item">
          <p>{{detail.disputeOrigin}}</p>
        </el-form-item>
        <el-form-item label="调解员：" class="detail-info-item">
          <p>{{detail.staffName}}</p>
        </el-form-item>
        <el-form-item label="发生地点：" class="detail-info-item">
          <p>{{detail.district}}</p>
        </el-form-item>
        <el-form-item label="责任单位：" class="detail-info-item">
          <p>{{detail.institution}}</p>
        </el-form-item>
        <el-form-item label="标签：" class="detail-info-item">
          <el-tag
            :key="item"
            v-for="item in detail.disputeTag">
            {{item}}
          </el-tag>
        </el-form-item>
      </el-form>
    </div>
    <div class="detail-list">
      <div class="sub-title">简要情况</div>
      <p class="detail-brief">{{detail.briefInfo}}</p>
    </div>
    <div class="detail-list">
      <div class="sub-title">调节结果</div>
      <p class="detail-brief success">{{detail.disputeResolution}}</p>
      <p class="detail-brief" v-if="detail.disputeResolution === '调解成功' && detail.resolutionDate">调解成功日期：{{detail.resolutionDate}}</p>
    </div>
    <div class="detail-list">
      <div class="sub-title">达成协议内容</div>
      <p class="detail-brief" v-if="Number(detail.compensation) !== 0">协议涉及金额：{{detail.compensation}}元</p>
      <p class="detail-brief" v-for="(item, index) in detail.agreement" :key="index">{{item}}</p>
    </div>
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
      activeIndex: '3',
      type: 'name',
      placeholder: '请输入书籍名称',
      id: '',
      detail: []
    }
  },
  components: {
    Nav
  },
  created () {
    this.id = this.$route.params.id ? this.$route.params.id : ''
    this.getDetail()
  },
  methods: {
    async getDetail () {
      let res = await this.getInfoById()
      if (res.success) {
        res.data.agreement = res.data.agreement.split('\n')
        this.detail = res.data
        this.detail.acceptDate = this.dateFormat(this.detail.acceptDate)
        this.detail.resolutionDate = this.dateFormat(this.detail.resolutionDate)
        let tag = res.data.disputeTag.split(' ')
        this.detail.disputeTag = []
        console.log(tag)
        for (let item in tag) {
          if (tag[item] !== ' ' && tag[item] !== '') {
            this.detail.disputeTag.push(tag[item])
          }
        }
      } else {
        this.$message('获取信息失败，请重试')
      }
    },
    getInfoById () {
      let that = this
      return new Promise((resolve, reject) => {
        resolve(Api('es/searchById', {id: that.id}))
      })
    },
    dateFormat (date) {
      if (date.indexOf('-') >= 0) {
        date = date.split('-')
        return date[0] + '年' + date[1] + '月' + date[2] + '日'
      } else {
        let year = date.substring(0, 4)
        let month = date.substring(4, 6)
        let day = date.substring(6, 8)
        return year + '年' + Number(month) + '月' + Number(day) + '日'
      }
    }
  }
}
</script>
<style>
.wrapper{position: fixed;top:0;bottom:0;width:100%;background:url(../../assets/img/index-back-8.jpg) top left no-repeat;background-size:cover;}
.detail{position:relative;overflow:auto;padding:60px 0;max-height:100%;box-sizing: border-box;}
.detail .detail-contain{position: relative;margin:30px 0;width:80%;margin-left:10%;padding:30px;background:#fff;margin-bottom:30px;}
.detail .detail-contain .title{font-size:24px;color:#333;padding-bottom:8px;border-bottom:1px solid #e0e0e0;margin-bottom:10px;}
.detail .detail-contain .detail-list{border-bottom:1px solid #e0e0e0;margin-bottom:10px;}
.detail .detail-contain .detail-list:last-child{border-bottom:0;margin-bottom:10px;}
.detail .detail-contain .sub-title{font-size:18px;color:#539eff;margin-bottom:10px;}
.detail .detail-contain .detail-form{margin-left:20px;}
.detail .detail-contain .detail-info-item{margin-bottom:0;}
.detail .detail-contain .detail-info-item .el-tag + .el-tag{margin-left: 5px;}
.detail .detail-contain .detail-brief{margin:8px 20px;}
.detail .detail-contain .detail-brief.success{color:#db2929;}
</style>
