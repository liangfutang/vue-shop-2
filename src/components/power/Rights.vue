<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-table :data="rightsList" border stripe>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="权限名称" prop="authName"></el-table-column>
              <!-- <el-table-column label="路径" prop="path"></el-table-column> -->
              <el-table-column label="权限等级" prop="level">
                <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.level === '1'">一级</el-tag>
                  <el-tag type="warning" v-else-if="scope.row.level === '2'">二级</el-tag>
                  <el-tag type="info" v-else-if="scope.row.level === '3'">三级</el-tag>
                  <el-tag type="success" v-else-if="scope.row.level === '4'">四级</el-tag>
                  <el-tag v-else>五级</el-tag>
                </template>
              </el-table-column>
            </el-table>
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
      const { data: rightsList } = await this.$http.get('/api/private/v1/right/' + 'list')
      if (rightsList.meta.status !== 200) return this.$message.error(rightsList.meta.msg)
      this.rightsList = rightsList.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
