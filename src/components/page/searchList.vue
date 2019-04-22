<template>
<div class="wrapper searchList">
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="search-tool-contain">
    <div class="search-contain">
      <div class="search-type-list">
        <a class="search-type-item" @click="changeType('name')" :class="type === 'name' ? 'active' : ''">按名称搜索</a>
        <a class="search-type-item" @click="changeType('author')" :class="type === 'author' ? 'active' : ''">按作者搜索</a>
        <a class="search-type-item" @click="changeType('ISBN')" :class="type === 'ISBN' ? 'active' : ''">按编号搜索</a>
      </div>
      <el-input :placeholder="placeholder" v-model="key" @keyup.enter.native="search" >
        <i slot="suffix" @click="search" class="el-input__icon el-icon-search search-btn"></i>
      </el-input>
    </div>
  </div>
  <div class="search-list">
    <div class="search-result-list">
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
      <el-card class="search-result-card" shadow="hover">
        <div slot="header" class="search-result-title">
          <a class="title">卡片名称</a>
        </div>
        <div class="search-result-info">
          一些内容
        </div>
        <div class="search-result-text">
          {{'列表内容 '}}
        </div>
      </el-card>
      <el-card class="search-result-card" shadow="hover">
        <div slot="header" class="search-result-title">
          <a class="title">卡片名称</a>
        </div>
        <div class="search-result-info">
          一些内容
        </div>
        <div class="search-result-text">
          {{'列表内容 '}}
        </div>
      </el-card>
      <el-pagination
        class="page"
        :page-size="20"
        :pager-count="5"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
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
  created () {
    this.key = this.$route.params.key
    this.type = this.$route.params.type
    console.log(this.key)
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
.searchList .search-list{position:relative;top:180px;max-height:600px;overflow:auto;}
.searchList .search-result-list{padding:50px;}
.searchList .search-result-list .search-result-card{width:60%;margin-left:20%;margin-bottom:30px;cursor: pointer;}
.searchList .search-result-list .search-result-card:hover{transform: translateY(-5px);}
.searchList .search-result-list .search-result-title{font-size:18px;}
.searchList .search-result-list .title{display:inline-block;color:#347bd8;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.searchList .search-result-list .title:hover{color:#2466bb;}
.searchList .search-result-list .search-result-info{padding-bottom:6px;border-bottom:1px dotted #eaeaea;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.searchList .search-result-list .search-result-text{padding-top:6px;position:relative;line-height:25px;max-height:75px;width:100%;overflow:hidden;}
.searchList .search-result-list .page{float:right;margin-right:20%;margin-bottom:50px;}
</style>
