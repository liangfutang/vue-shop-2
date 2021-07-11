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
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model='queryInfo.query' clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <!-- 添加用户按钮 -->
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogTableVisible = true">添加用户</el-button>
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

            <!-- 分页区域 -->
            <el-pagination :current-page="queryInfo.pageNum" :page-size="queryInfo.pageSize" :page-sizes="[1, 2, 5, 10, 20]"  layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>

            <!-- 添加用户提示框 -->
            <el-dialog title="添加用户" :visible.sync="addDialogTableVisible" @close="addDialogTableClose">
              <el-form :model="addUserModel" ref="resetAddUserRef" label-width="100px">
                  <!-- 输入框 -->
                  <el-form-item label="用户名" prop="userName">
                      <el-input v-model.number="addUserModel.userName"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model.number="addUserModel.password"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model.number="addUserModel.email"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="mobile">
                      <el-input v-model.number="addUserModel.mobile"></el-input>
                  </el-form-item>
              </el-form>
              <!-- 底部区域 -->
              <span slot="footer" class="dialog-footer">
                  <el-button @click="addDialogTableVisible = false">取 消</el-button>
                  <el-button type="info" @click="resetAddForm('resetAddUserRef')">重置</el-button>
                  <el-button type="primary" @click="addUser">确 定</el-button>
              </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      userList: [],
      total: 0,
      // 添加用户对话框
      addDialogTableVisible: false,
      addUserModel: {
        userName: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/api/private/v1/users', {
        params: this.queryInfo
      })
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
    },
    // 监听每页数目的变化
    handleSizeChange (newPageSize) {
      this.queryInfo.pageSize = newPageSize
      this.getUserList()
    },
    // 监听当前页的变化
    handleCurrentChange (newPageNum) {
      this.queryInfo.pageNum = newPageNum
      this.getUserList()
    },
    // 重置添加用户对话框
    resetAddForm (resetAddUserRef) {
      this.$refs[resetAddUserRef].resetFields()
    },
    // 添加用户到后台
    addUser () {
      this.$refs.resetAddUserRef.validate(async valid => {
        if (!valid) return
        // 发起新增用户的网络请求
        const { data: res } = await this.$http.post('/api/private/v1/users', this.addUserModel)
        // 如果新增失败则提示失败
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg === '' ? '新增用户失败' : res.meta.msg)
        } else {
          this.$message.success(res.meta.msg)
        }
        // 刷新用户列表
        this.getUserList()
      })
    },
    // 关闭添加用户对话框后清空对话框
    addDialogTableClose () {
      this.$refs.resetAddUserRef.resetFields()
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
