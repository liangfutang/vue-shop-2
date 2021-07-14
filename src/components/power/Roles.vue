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
            <el-table :data="roleTableData" border stripe highlight-current-row style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column type="expand">
                  <template slot-scope="scope">
                      <el-row :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, index1) in scope.row.authList" :key="item1.id">
                        <!-- 渲染一级权限 -->
                        <el-col :span="5">
                          <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                          <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 渲染二级和三级权限 -->
                        <el-col :span="19">
                          <!-- 通过 for 循环 嵌套渲染二级权限 -->
                          <el-row :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, index2) in item1.children" :key="item2.id">
                            <el-col :span="6">
                              <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                              <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="6">
                              <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoleById(scope.row.id)">删除</el-button>
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

            <!-- 编辑角色提示框 -->
            <el-dialog title="编辑角色" width="50%" :visible.sync="editDialogTableVisible" @close="editDialogTableClose">
              <el-form :model="editRoleModel" :rules="addRoleFormRules" ref="resetEditRoleRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="editRoleModel.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                  <el-input v-model="editRoleModel.roleDesc"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="eidtRoleInfo">确 定</el-button>
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
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      roleTableData: [],
      addDialogTableVisible: false,
      editDialogTableVisible: false,
      addRoleModel: {
        roleName: '',
        roleDesc: ''
      },
      editRoleModel: {},
      addRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度须在 3 到 16 个字符', trigger: 'blur' }
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
    addUser () {
      this.$refs.resetAddRoleRef.validate(async valid => {
        if (!valid) return
        const { data: addResult } = await this.$http.post('/api/private/v1/roles', this.addRoleModel)
        if (addResult.meta.status !== 200) return this.$message.error(addResult.meta.msg)
        this.addDialogTableVisible = false
        this.getRoleList()
      })
    },
    async deleteRoleById (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(error => error)
      // 取消操作
      if (confirmResult !== 'confirm') return this.$message.info('取消删除该角色')
      // 确定操作
      const { data: deleteResult } = await this.$http.delete(`/api/private/v1/roles/${id}`)
      if (deleteResult.meta.status !== 200) return this.$message.error(deleteResult.meta.msg)
      // 删除完刷新列表
      this.getRoleList()
    },
    editDialogTableClose () {
      this.$refs.resetEditRoleRef.resetFields()
    },
    showEditDialog (editRoleInfo) {
      this.editDialogTableVisible = true
      this.editRoleModel = editRoleInfo
    },
    eidtRoleInfo () {
      this.$refs.resetEditRoleRef.validate(async valid => {
        if (!valid) return
        // 发送修改的网络请求
        const { data: editResult } = await this.$http.put(`/api/private/v1/roles/${this.editRoleModel.id}`, {
          roleName: this.editRoleModel.roleName,
          roleDesc: this.editRoleModel.roleDesc
        })
        if (editResult.meta.status !== 200) return this.$message.error(editResult.meta.msg)
        this.$message.success(editResult.meta.msg)
        this.editDialogTableVisible = false
        this.getRoleList()
      })
    },
    async removeRightById (roleInfo, id) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') return this.$message.info('取消了删除！')

      const { data: removeResult } = await this.$http.delete(`/api/private/v1/roles/${roleInfo.id}/rights/${id}`)
      if (removeResult.meta.status !== 200) return this.$message.error(removeResult.meta.msg)

      // this.getRoleList()
      roleInfo.authList = removeResult.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
