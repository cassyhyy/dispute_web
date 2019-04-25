<template>
<div class="wrapper searchList">
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="search-tool-contain">
    <div class="search-contain">
      <div class="search-type-list">
        <a class="search-type-item">请输入名称进行搜索</a>
      </div>
      <el-input :placeholder="placeholder" v-model="key" @keyup.enter.native="getSearch" >
        <i slot="suffix" @click="getSearch" class="el-input__icon el-icon-search search-btn"></i>
      </el-input>
    </div>
  </div>
  <div class="search-list">
    <div class="search-result-list">
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
      activeIndex: '3',
      placeholder: '请输入书籍名称',
      key: '', // 搜索关键词
      page: 0,
      limit: 10,
      total: 0, // 结果总数
      list: [] // 搜索结果列表
    }
  },
  components: {
    Nav
  },
  created () {
    this.key = this.$route.params.key ? this.$route.params.key : ''
    if (this.key && this.type) {
      this.getSearch()
    }
  },
  methods: {
    // 搜索
    async getSearch () {
      let res = await this.search()
      if (res.success) {
        this.list = res.data.list
        this.total = res.data.total
      }
    },
    // 按标题搜索接口调用
    search () {
      let that = this
      return new Promise((resolve, reject) => {
        resolve(Api('es/searchByTitle', {page: that.page, limit: that.limit, title: that.key}))
      })
    },
    // 页面切换
    handleCurrentChange (val) {
      this.page = val - 1
      this.getSearch()
    }
  }
}
</script>
<style>
.wrapper{overflow:hidden;position:absolute;top:0;bottom:0;width:100%;background:url(../../assets/img/index-back-8.jpg) top left no-repeat;background-size:cover;}
.searchList .search-tool-contain{position:fixed;top:60px;padding:25px 0;width:100%;background:rgba(25, 25, 25, 0.50);}
.searchList .search-tool-contain .search-contain{position:relative;width:40%;margin-left:30%;height:70px;}
.searchList .search-tool-contain .search-contain .search-type-list{margin-bottom:5px;}
.searchList .search-tool-contain .search-contain .search-type-item{font-size:15px;color:#cacede;margin-right:10px;cursor:pointer;}
.searchList .search-tool-contain .search-contain .search-type-item.active{color:#7a94ff;font-size:17px;}
.searchList .search-tool-contain .search-contain .search-btn{cursor:pointer;}
.searchList .search-list{position:relative;top:180px;max-height:560px;overflow:auto;}
.searchList .search-result-list{padding:50px;}
.searchList .search-result-list .search-result-card{width:60%;margin-left:20%;margin-bottom:30px;cursor: pointer;}
.searchList .search-result-list .search-result-card:hover{transform: translateY(-5px);}
.searchList .search-result-list .search-result-title{font-size:18px;}
.searchList .search-result-list .title{display:inline-block;color:#347bd8;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.searchList .search-result-list .title:hover{color:#2466bb;}
.searchList .search-result-list .search-result-info{padding-bottom:6px;border-bottom:1px dotted #eaeaea;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.searchList .search-result-list .search-result-text{padding-top:6px;position:relative;line-height:25px;max-height:75px;width:100%;overflow:hidden;}
.searchList .search-result-list .search-result-text.center{text-align:center;}
.searchList .search-result-list .page{float:right;margin-right:20%;margin-bottom:50px;}
</style>
