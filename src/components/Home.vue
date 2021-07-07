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
            <el-aside width="auto" @mouseenter.native="collapseOpen" @mouseleave.native="collapseClose">
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
                    <!-- 导航--展示一 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">产品</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">报表展示</span>
                            <el-menu-item index="1-1">书籍类</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="数据录入">
                            <el-menu-item index="1-3">录入</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!-- 导航--展示二 -->
                    <el-submenu index='2'>
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">利润</span>
                        </template>
                        <el-menu-item index="1-3">经销</el-menu-item>
                    </el-submenu>
                    <!-- 导航--设置 -->
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 主页面 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // true表示左边栏向左收起
      isCollapse: true
    }
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 左边栏展开
    collapseOpen () {
      this.isCollapse = false
    },
    // 左边栏收起
    collapseClose () {
      this.isCollapse = true
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

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
 }
</style>
