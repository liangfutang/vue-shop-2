<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片选择区 -->
        <el-card class="box-card">
          <el-row>
            <el-col>
              <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
            </el-col>

            <!-- 表格 -->
            <tree-table class="treeTable" :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border :show-row-hover="false">
              <!-- 是否有效 -->
              <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.isDeleted === false" style="color: lightgreen;"></i>
                <i class="el-icon-error" v-else style="color: red;"></i>
              </template>
              <!-- 排序 -->
              <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.level===0">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.children===1">二级</el-tag>
                <el-tag type="warning" size="mini" v-else>三级</el-tag>
              </template>
              <!-- 操作 -->
              <template slot="opt">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </tree-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="querInfo.pagenum" :page-sizes="[3, 5, 10, 15]" :page-size="querInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-row>
        </el-card>
    </div>
</template>

<script src="./_cate.js" lang="js"></script>

<style src="./_cate.less" lang="less" scoped></style>
