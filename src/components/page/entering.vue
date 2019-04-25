<template>
<div>
  <Nav :activeIndex="activeIndex"></Nav>
  <div class="wrapper enter">
    <div class="enter-side">
      <div class="btn-list">
        <a class="btn-item" @click="rewrite">重新录入</a>
        <a class="btn-item" @click="scrollToRef('info')">文书信息</a>
        <a class="btn-item" @click="scrollToRef('tag')">查看标签</a>
        <a class="btn-item" @click="confirm">提交文书</a>
      </div>
    </div>
    <div class="enter-contain">
      <div class="enter-detail" ref="info">
        <p class="tip">*请根据描述填写相关信息并录入文书。</p>
        <el-form :model="ruleModel" :rules="rules" ref="ruleForm" label-width="80px">
          <!-- 非必填 -->
          <el-form-item label="编号">
            <el-input placeholder="编号" v-model="ruleModel.number"></el-input>
          </el-form-item>
          <!-- 必填 -->
          <el-form-item label="纠纷名称" prop="name">
            <el-input placeholder="纠纷名称" v-model="ruleModel.name"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="纠纷类型">
                <span>{{ruleModel.type}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="案件评估">
                <el-select v-model="ruleModel.evaluation" placeholder="请选择">
                  <el-option
                    v-for="item in evaluations"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="激烈程度">
                <el-select v-model="ruleModel.fierce" placeholder="请选择">
                  <el-option
                    v-for="item in fierceDegree"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纠纷等级">
                <el-select v-model="ruleModel.dispute" placeholder="请选择">
                  <el-option
                    v-for="item in disputeDegree"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <!-- 必填 -->
              <el-form-item label="涉及人数">
                <el-input-number v-model="ruleModel.people" size="medium" controls-position="right" :min="1"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- 非必填 -->
              <el-form-item label="涉及金额">
                <el-input-number v-model="ruleModel.money" :precision="2" size="medium" controls-position="right" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- 必填 -->
              <el-form-item label="受理时间" prop="acceptDate">
                <el-date-picker
                  v-model="ruleModel.acceptDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="案件来源">
                <el-select v-model="ruleModel.origin" placeholder="请选择">
                  <el-option
                    v-for="item in disputeOrigin"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="发生地点">
            <el-row :gutter="0">
              <el-col :span="3">
                江苏省-南京市
              </el-col>
              <el-col :span="4">
                <el-select v-model="ruleModel.district" placeholder="区名" class="select-tool">
                  <el-option
                    v-for="item in districts"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="17"><el-input placeholder="详细地址" v-model="ruleModel.address"></el-input></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="简要情况" prop="brief">
            <el-input placeholder="简要情况" v-model="ruleModel.brief" type="textarea" :rows="8" resize="none"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="调解员">
                <el-input placeholder="调解员" v-model="ruleModel.staff"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调节结果">
                <el-select v-model="ruleModel.resolution" placeholder="调节结果" class="select-tool">
                  <el-option
                    v-for="item in disputeResolution"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成功时间">
                <el-date-picker
                  v-model="ruleModel.endDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="责任单位" prop="institution">
                <el-input placeholder="责任单位" v-model="ruleModel.institution"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当事人">
                <el-input placeholder="当事人姓名" v-model="ruleModel.personName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医院名称">
                <el-input placeholder="医院名称" v-model="ruleModel.hospitalName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="达成协议" prop="agreement">
            <el-input placeholder="达成协议内容" v-model="ruleModel.agreement" type="textarea" :rows="3" resize="none"></el-input>
          </el-form-item>
          <el-form-item>
            <el-card class="tag-card" shadow="hover">
              <div slot="header" class="tag-title">
                标签 <el-button class="button-new-tag" size="small" @click="getTagList">自动生成标签</el-button>
              </div>
              <div class="tag-info">
                <el-tag
                  :key="item"
                  v-for="item in ruleModel.tags"
                  closable
                  :disable-transitions="false"
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
import {Api} from '@/Api/index'
export default {
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '请输入纠纷名称', trigger: 'blur' }
        ],
        institution: [
          { required: true, message: '请输入责任单位', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入简要内容', trigger: 'blur' }
        ],
        agreement: [
          { required: true, message: '请输入达成协议内容', trigger: 'blur' }
        ],
        acceptDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      activeIndex: '1',
      placeholder: '请输入书籍名称',
      key: '', // 搜索关键词
      ruleModel: {
        number: '', // 编号
        name: '', // 纠纷名
        people: 1, // 涉及人数
        money: 0, // 涉及金额
        acceptDate: new Date(), // 受理时间
        address: '', // 详细地址
        brief: '', // 简要情况
        staff: '', // 调解员
        institution: '', // 责任单位
        endDate: '', // 调解成功时间
        personName: '', // 当事人名称
        hospitalName: '', // 医院名称
        agreement: '', // 达成协议内容
        tags: [],
        type: '医疗纠纷',
        evaluation: '基本控制',
        fierce: '中',
        dispute: '一般',
        origin: '依申请调解',
        resolution: '调解成功',
        district: '玄武区'
      },
      inputVisible: false,
      inputValue: '',
      districts: ['玄武区', '秦淮区', '鼓楼区', '建邺区', '栖霞区', '雨花台区', '浦口区', '江宁区', '六合区', '溧水区', '高淳区'],
      disputeResolution: ['调解成功', '调解中', '调解不成功'],
      disputeOrigin: ['依申请调解', '公安机关委托移送', '主动调解', '其他部门委托移送'],
      disputeDegree: ['简易', '一般', '重大'],
      fierceDegree: ['低', '中', '高'],
      evaluations: ['基本控制', '存在反复', '赴省上访', '个人极端行为', '可能民转刑', '难以确定'],
      isLoading: false // 放重复提交
    }
  },
  components: {
    Nav
  },
  computed: {
    name () {
      return this.ruleModel.name
    }
  },
  watch: {
    name () {
      this.getName()
    }
  },
  methods: {
    handleClose (tag) {
      this.ruleModel.tags.splice(this.ruleModel.tags.indexOf(tag), 1)
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
        this.ruleModel.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 自动生成标签
    async getTagList () {
      let res = await this.getTagByContent()
      if (res && res.success) {
        this.ruleModel.tags = res.data
      }
    },
    // 根据简要内容获取标签
    getTagByContent () {
      let that = this
      if (!that.ruleModel.brief) {
        this.$message('请输入简要信息')
        return
      }
      return new Promise((resolve, reject) => {
        resolve(Api('text/getKeyword', {content: that.ruleModel.brief}))
        reject(Api('text/getKeyword', {content: that.ruleModel.brief}))
      })
    },
    // 正则匹配名字和医院名
    getName () {
      var nameReg = /^.+?(与)/g
      var hospitalReg = /(与).+?(医院)/g
      if (this.name.match(nameReg)) {
        let pName = this.name.match(nameReg)[0]
        this.ruleModel.personName = pName.substring(0, pName.length - 1)
      }
      if (this.name.match(hospitalReg)) {
        let hName = this.name.match(hospitalReg)[0]
        this.ruleModel.hospitalName = hName.substring(1, hName.length)
      }
    },
    // 校验输入内容
    confirm () {
      if (!this.ruleModel.name) {
        this.$message('请输入纠纷名称')
        return
      }
      if (!this.ruleModel.acceptDate) {
        this.$message('请输入受理时间')
        return
      }
      if (!this.ruleModel.brief) {
        this.$message('请输入简要情况')
        return
      }
      if (this.ruleModel.resolution === '调解成功' && !this.ruleModel.endDate) {
        this.$message('请选择调解成功时间')
        return
      }
      if (!this.ruleModel.institution) {
        this.$message('请输入责任单位')
        return
      }
      if (!this.ruleModel.agreement) {
        this.$message('请输入达成协议内容')
        return
      }
      if (!this.ruleModel.tags.length) {
        this.$confirm('未生成标签，是否确认提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getSubmitRes()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
      } else {
        this.getSubmitRes()
      }
    },
    // 处理提交结果
    async getSubmitRes () {
      if (!this.isLoading) {
        this.isLoading = true
        let res = await this.submit()
        if (res.success) {
          this.isLoading = false
          this.$message('提交成功！')
          this.rewrite()
        } else {
          this.isLoading = false
          this.$message('提交失败，请重试！')
        }
      } else {
        this.$message('正在提交，请勿重复点击')
      }
    },
    // 提交输入内容
    submit () {
      let that = this
      let tag = ''
      for (let item in that.ruleModel.tags) {
        tag = that.ruleModel.tags[item] + ' '
      }
      let acceptDate = that.dateFormat(that.ruleModel.acceptDate)
      let endDate = that.ruleModel.endDate ? that.dateFormat(that.ruleModel.endDate) : ''
      console.log(endDate)
      return new Promise((resolve, reject) => {
        resolve(Api('es/inputCase', {
          disputeNO: that.ruleModel.number,
          district: '江苏省-南京市-' + that.ruleModel.district,
          disputeName: that.ruleModel.name,
          evaluation: that.ruleModel.evaluation,
          fierceDegree: that.ruleModel.fierce,
          disputePerson: that.ruleModel.people,
          compensation: that.ruleModel.money,
          disputeDegree: that.ruleModel.dispute,
          acceptDate: acceptDate,
          disputeOrigin: that.ruleModel.origin,
          disputeType: that.ruleModel.type,
          disputeArea: '江苏省-南京市-' + that.ruleModel.district,
          disputeLocation: that.ruleModel.address,
          briefInfo: that.ruleModel.brief,
          disputeResolution: that.ruleModel.resolution,
          resolutionDate: endDate,
          institution: that.ruleModel.institution,
          staffName: that.ruleModel.staff,
          agreement: that.ruleModel.agreement,
          disputeTag: tag,
          personName: that.ruleModel.personName,
          hospitalName: that.ruleModel.hospitalName
        }))
      })
    },
    // 数据初始化
    rewrite () {
      this.ruleModel = {
        number: '', // 编号
        name: '', // 纠纷名
        people: 1, // 涉及人数
        money: 0, // 涉及金额
        acceptDate: new Date(), // 受理时间
        address: '', // 详细地址
        brief: '', // 简要情况
        staff: '', // 调解员
        institution: '', // 责任单位
        endDate: '', // 调解成功时间
        personName: '', // 当事人名称
        hospitalName: '', // 医院名称
        agreement: '', // 达成协议内容
        tags: [],
        type: '医疗纠纷',
        evaluation: '基本控制',
        fierce: '中',
        dispute: '一般',
        origin: '依申请调解',
        resolution: '调解成功',
        district: '玄武区'
      }
    },
    // 时间格式化
    dateFormat (date) {
      let d = new Date(date)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      d = '' + year + month + day
      return d
    },
    // 滚动到指定位置，代替锚点
    scrollToRef (ref) {
      let top = 0
      if (ref === 'info') {
        top = this.$refs.info.offsetTop
      } else if (ref === 'tag') {
        top = 800
      }
      console.log(this.$refs.info.offsetTop)
      // 实现滚动效果
      setTimeout(e => {
        // chrome
        document.body.scrollTop = top
        // firefox
        document.documentElement.scrollTop = top
        // safari
        window.pageYOffset = top
      }, 0)
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
.enter .enter-contain .enter-detail .el-date-editor.el-input{width:100%;}
</style>
