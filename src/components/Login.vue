<template>
    <div class="login_container">
        <!-- 整个登录区设置 -->
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="登录表单上的头像图标">
            </div>

            <!-- 输入表单区 -->
            <el-form ref="loginFormRef" :model="loginFormModel" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item prop="loginName">
                    <el-input v-model="loginFormModel.loginName" prefix-icon='iconfont icon-zhanghao'></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginFormModel.password" prefix-icon='iconfont icon-mima' type="password"></el-input>
                </el-form-item>
                <!-- 登录和重置按钮 -->
                <el-form-item class="loginAndReset">
                  <el-button type="primary" @click="doLogin('loginFormRef')">登录</el-button>
                  <el-button type="info" @click="resetLoginForm('loginFormRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginFormModel: {
        loginName: '',
        password: ''
      },
      loginFormRules: {
        loginName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '账号长度必须是3到16个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '密码长度必须是3到16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm (loginForm) {
      this.$refs[loginForm].resetFields()
    },
    doLogin (loginForm) {
      this.$refs[loginForm].validate(async valid => {
        // 表单校验是否通过
        if (!valid) {
          console.log('校验不通过，不能提交表单')
          return
        }
        const { data: result } = await this.$http.post('/api/private/v1/login', this.loginFormModel)

        // 登录失败
        if (result.meta.status !== 200) {
          return this.$message.error(result === undefined || result == null || result.meta == null || result.meta.msg == null || result.meta.msg === '' ? '登录失败' : result.meta.msg)
        }

        // 请求登录成功显示消息提示
        // 1. 成功后显示成功的提示消息
        this.$message.success('登录成功')
        // 2. 获取token并将token存储到本地
        window.sessionStorage.setItem('token', result.data.token)
        // 3. 成功后需要跳转到首页导航页面
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    left: 50%;
    top: 50%;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    transform: translate(-50%, -50%);
}

// 设置头像相关样式
.avatar_box{
  width: 130px;
  height: 130px;
  left: 50%;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

// 登录表单相关
.login_form{
    width: 100%;
    bottom: 0;
    position: absolute;
    padding: 0 10%;
    box-sizing: border-box;
}

// 登录和重置按钮样式
.loginAndReset{
  display: flex;
  justify-content: flex-end;
}
</style>
