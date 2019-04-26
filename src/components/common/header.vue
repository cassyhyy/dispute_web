<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo nav" mode="horizontal" @select="handleSelect">
    <el-menu-item disabled class="title">医患纠纷</el-menu-item>
    <el-menu-item index="1">录入文书</el-menu-item>
    <el-menu-item index="2">医患纠纷-普通用户入口</el-menu-item>
    <el-menu-item index="3">搜索</el-menu-item>
    <el-menu-item index="4">使用方式</el-menu-item>
    <el-menu-item index="5" class="pull-right">联系我们</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '1':
          this.$router.push({name: 'entering'})
          break
        case '2':
          this.$router.push({name: 'common'})
          break
        case '3':
          this.$router.push({name: 'home'})
          break
        case '4':
          this.$router.push({name: ''})
          break
        case '5':
          this.$router.push({name: ''})
          break
      }
    }
  }
}
</script>

<style>
.nav{position:fixed;left:0;right:0;top:0;height:60px;z-index: 1;}
.nav .title{float:left;height:60px;line-height:60px;padding:0 40px;margin-left:40px;}
.nav .pull-right.el-menu-item{float:right;}
.nav .el-menu-item.is-disabled{color:#333;cursor: pointer;opacity:inherit;font-size:18px;}
</style>
