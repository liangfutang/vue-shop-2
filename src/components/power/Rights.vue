<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            卡片区
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 权限列表数据
      rightsList: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    // 获取权限列表
    async getRightList () {
      const { data: rightsList } = await this.$http.get('/api/private/v1/right/list')
      if (rightsList.meta.status !== 200) return this.$message.error(rightsList.meta.msg)
      this.rightsList = rightsList.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
