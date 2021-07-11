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
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserById(scope.row.id)"></el-button>
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
            <el-dialog title="添加用户" width="50%" :visible.sync="addDialogTableVisible" @close="addDialogTableClose">
              <el-form :model="addUserModel" ref="resetAddUserRef" label-width="70px">
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

            <!-- 编辑用户提示框 -->
            <el-dialog title="编辑用户" width="50%" :visible.sync="editDialogTableVisible" @close="editDialogTableClose">
              <el-form :model="editUserModel" ref="resetEditUserRef" label-width="70px">
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="editUserModel.userName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editUserModel.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="editUserModel.mobile"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="eidtUserInfo">确 定</el-button>
              </div>
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
      // 添加用户对话框是否展示
      addDialogTableVisible: false,
      // 编辑用户对话框是否展示
      editDialogTableVisible: false,
      addUserModel: {
        userName: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑对话框中数据
      editUserModel: {}
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
        // 先关闭对话框
        this.addDialogTableVisible = false
        // 刷新用户列表
        this.getUserList()
      })
    },
    // 关闭添加用户对话框后清空对话框
    addDialogTableClose () {
      this.$refs.resetAddUserRef.resetFields()
    },
    // 根据id删除用户
    async deleteUserById (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(error => error)

      // 点击确认返回的是confirm， 点击取消返回的是cancel
      // 如果点击取消，则不进行下面的动作
      if (confirmResult !== 'confirm') return this.$message.info('取消删除该用户')
      // 点击确定后，删除该用户信息，并刷新用户列表
      const { data: deleteResult } = await this.$http.delete(`/api/private/v1/users/${id}`)
      if (deleteResult.meta.status !== 200) this.$message.error(deleteResult.meta.msg)
      // 删除完刷新列表
      this.getUserList()
    },
    // 关闭对话框的时候清空对话框内容
    editDialogTableClose () {
      this.$refs.resetEditUserRef.resetFields()
    },
    // 编辑修改用户信息
    eidtUserInfo () {
      this.$refs.resetEditUserRef.validate(async valid => {
        if (!valid) return
        // 向后端发起修改请求
        const { data: editResult } = await this.$http.put(
          `/api/private/v1/users/${this.editUserModel.id}`,
          {
            userName: this.editUserModel.userName,
            email: this.editUserModel.email,
            mobile: this.editUserModel.mobile
          }
        )
        if (editResult.meta.status !== 200) { return this.$message.error(editResult.meta.msg) }
        // 后端修改后刷新列表
        this.getUserList()
        // 关闭编辑对话框
        this.editDialogTableVisible = false
        // 提示用户修改成
        this.$message.success(editResult.meta.msg)
      })
    },
    // 展示要编辑的用户对话框
    async showEditDialog (id) {
      // 根据id查找用户信息
      const { data: selectResult } = await this.$http.get(`/api/private/v1/users/${id}`)
      if (selectResult.meta.status !== 200) return this.$message.error(selectResult.meta.msg)
      // 将查到的信息赋值给临时变量
      this.editUserModel = selectResult.data
      // 修改打开窗口的标志状态
      this.editDialogTableVisible = true
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
