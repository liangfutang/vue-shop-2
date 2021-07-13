<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card  class="box-card">
            <!-- 添加角色按钮 -->
            <el-row>
                <el-button type="primary" @click="addDialogTableVisible = true">添加角色</el-button>
            </el-row>

            <!-- 角色列表区域 -->
            <el-table :data="roleTableData" border style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template>
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <!-- 分配角色按钮 -->
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination :current-page="queryInfo.pageNum" :page-size="queryInfo.pageSize" :page-sizes="[1, 2, 5, 10, 20]"  layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>

            <!-- 添加角色对话框 -->
            <el-dialog title="添加角色" width="50%" :visible.sync="addDialogTableVisible" @close="addDialogTableClose">
              <el-form :model="addRoleModel" :rules="addRoleFormRules" ref="resetAddRoleRef" label-width="80px">
                  <!-- 输入框 -->
                  <el-form-item label="角色名称" prop="roleName">
                      <el-input v-model.number="addRoleModel.roleName"></el-input>
                  </el-form-item>
                  <el-form-item label="角色描述" prop="roleDesc">
                      <el-input v-model.number="addRoleModel.roleDesc"></el-input>
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
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      roleTableData: [],
      addDialogTableVisible: false,
      addRoleModel: {
        roleName: '',
        roleDesc: ''
      },
      addRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度须在 3 到 16 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 16, message: '长度须在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { data: selectResult } = await this.$http.get('/api/private/v1/roles', {
        params: this.queryInfo
      })
      if (selectResult.meta.status !== 200) return this.$message.error(selectResult.meta.msg)
      this.roleTableData = selectResult.data.data
      this.total = selectResult.data.total
    },
    handleSizeChange (newPageSize) {
      this.queryInfo.pageSize = newPageSize
      this.getRoleList()
    },
    handleCurrentChange (newPageNum) {
      this.queryInfo.pageNum = newPageNum
      this.getRoleList()
    },
    addDialogTableClose () {
      this.$refs.resetAddRoleRef.resetFields()
    },
    resetAddForm (resetAddUserRef) {
      this.$refs.resetAddRoleRef.resetFields()
    },
    async addUser () {
      const { data: addResult } = await this.$http.post('/api/private/v1/roles', this.addRoleModel)
      if (addResult.meta.status !== 200) return this.$message.error(addResult.meta.msg)
      this.addDialogTableVisible = false
      this.getRoleList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
