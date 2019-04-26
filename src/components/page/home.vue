<template>
<div class="wrapper home">
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="home-contain">
    <div class="search-contain">
      <div class="search-type-list">
        <a class="search-type-item">请输入名称进行搜索</a>
      </div>
      <el-input :placeholder="placeholder" v-model="key" @keyup.enter.native="search" >
        <i slot="suffix" @click="search" class="el-input__icon el-icon-search search-btn"></i>
      </el-input>
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
      placeholder: '请输入书籍名称',
      key: '' // 搜索关键词
    }
  },
  components: {
    Nav
  },
  methods: {
    search () {
      if (!this.key) {
        this.$message('请输入搜索关键词')
        return
      }
      this.$router.push({name: 'searchList', params: {key: this.key}})
    }
  }
}
</script>
<style>
.wrapper.home{position:absolute;top:0;bottom:0;width:100%;background:url(../../assets/img/index-back-4.jpg) top left no-repeat;background-size:cover;}
.home .home-contain{position:absolute;top:50%;padding:65px 0;margin-top:-100px;width:100%;background:rgba(25, 25, 25, 0.50);}
.home .home-contain .search-contain{position:relative;width:40%;margin-left:30%;height:70px;}
.home .home-contain .search-contain .search-type-list{margin-bottom:5px;}
.home .home-contain .search-contain .search-type-item{font-size:15px;color:#cacede;margin-right:10px;cursor:pointer;}
.home .home-contain .search-contain .search-type-item.active{color:#7a94ff;font-size:17px;}
.home .home-contain .search-contain .search-btn{cursor: pointer;}
</style>
