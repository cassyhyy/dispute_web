<template>
<div class="wrapper home">
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="main">
    <div class="main--top">
      <h1>小组成员</h1>
      <table class="group">
        <tr class="member" v-for="(member,index) in group" :key="index">
          <td>{{member.id}}</td>
          <td>{{member.name}}</td>
        </tr>
      </table>
    </div>
    <div class="main--bottom">
      <h2>联系方式</h2>
      <p>Tel: 15651767360</p>
      <p>Email: hyy122116@163.com</p>
    </div>
  </div>
</div>
</template>

<script>
import Nav from '@/components/common/header'
export default {
  data () {
    return {
      activeIndex: '5',
      group: [{
        id: '71115403',
        name: '洪媛媛'
      }, {
        id: '71115402',
        name: '王  悦'
      }, {
        id: '71115441',
        name: '林宜宁'
      }, {
        id: '71115407',
        name: '乔子怡'
      }, {
        id: '09015206',
        name: '张馨月'
      }]
    }
  },
  components: {
    Nav
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.wrapper.home{
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
  background:url(../../assets/img/index-back-8.jpg) top left no-repeat;
  background-size:cover;
}

.main{
  position:absolute;
  top:20%;
  left:10%;
  &--top{
    margin-bottom:80px;
  }
  &--bottom{
    p:nth-child(2){
      margin-bottom:5px;
    }
  }
}

.group{
  .member{
    font-size:18px;
    td:nth-child(1){
      padding-right:10px;
    }
  }
}
</style>
