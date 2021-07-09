<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片选择区 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <!-- 输入框 -->
                <el-col :span="7">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <!-- 添加用户按钮 -->
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 显示用户列表数据 -->
            <el-table :data="userList" border stripe style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="mgState" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mgState" active-color="#13ce66" inactive-color="#909399" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="200px">
                    <template >
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip class="item" effect="dark" content="角色分配" placement="top-end" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
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
      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      userList: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/api/private/v1/users', this.queryInfo)
      // 如果业务code状态不是200则弹出提示消息
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.userList = res.data.data
      this.total = res.data.total
    },
    // 监听switch开关的状态
    async userStateChanged (userInfo) {
      const { data: res } = await this.$http.put(`/api/private/v1/users/${userInfo.id}/state/${userInfo.mgState}`)
      // 更新失败的时候，弹出消息，并需要将显示列表中的状态数据改过来
      if (res.meta.status !== 200) {
        userInfo.mgState = !userInfo.mgState
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
