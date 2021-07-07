<template>
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/home-header.jpg" alt="导航图标"/>
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边 -->
            <el-aside width="200px">Aside</el-aside>
            <!-- 主页面 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 10%;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
    background-color: #333744;
}

.el-main {
     background-color: #eaedf1;
 }
</style>
