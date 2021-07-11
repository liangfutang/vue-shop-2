<template>
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/home-header.jpg" alt="导航图标"/>
                <span>后台数据管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边 -->
            <el-aside width="auto" @mouseenter.native="collapseOpen" @mouseleave.native="collapseClose">
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened router :default-active="activePath">
                    <!-- 导航--一级导航 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span slot="title">{{item.menuName}}</span>
                        </template>
                        <!-- 二级导航 -->
                        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath(subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{subItem.menuName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主页面 -->
            <el-main>
              <!-- 路由占位符 -->
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // true表示左边栏向左收起
      isCollapse: true,
      // 左侧导航菜单列表
      menuList: [],
      // 保存被激活链接地址
      activePath: '',
      // 图标
      iconsObj: {
        110: 'iconfont icon-icon_users',
        130: 'iconfont icon-quanxianguanli',
        150: 'iconfont icon-shangpinguanli',
        170: 'iconfont icon-dingdanguanli-',
        190: 'iconfont icon-baobiao'
      }
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 左边栏展开
    collapseOpen () {
      this.isCollapse = false
    },
    // 左边栏收起
    collapseClose () {
      this.isCollapse = true
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('/api/private/v1/menus')
      // 如果请求异常，显示提示消息
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    saveActivePath (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
    .el-menu {
    border-right: none;
  }
}

.el-main {
     background-color: #eaedf1;
 }

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
 }

// 导航中的图标和文字说明之间保持间距
 .iconfont {
  margin-right: 10px;
}
</style>
