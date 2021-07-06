<template>
    <div class="login_container">
        <!-- 整个登录区设置 -->
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="登录表单上的头像图标">
            </div>

            <!-- 输入表单区 -->
            <el-form ref="formRef" :model="loginFormModel" label-width="0px" class="login_form">
                <el-form-item>
                    <el-input v-model="loginFormModel.loginName" prefix-icon='iconfont icon-zhanghao'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginFormModel.password" prefix-icon='iconfont icon-mima' type="password"></el-input>
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
      }
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
</style>
