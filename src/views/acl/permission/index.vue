<template>
  <el-table :data="permissionList" border row-key="id">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button
          type="primary"
          size="default"
          :disabled="row.level == 4"
          @click="addPermission(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="warning"
          size="default"
          :disabled="row.level == 1"
          @click="editPermission(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确认要删除${row.name}吗？`"
          icon="Delete"
          width="220px"
          @confirm="deletePermission(row.id)"
        >
          <template #reference>
            <el-button type="danger" size="default" :disabled="row.level == 1">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    :title="permissionParams.id ? '修改菜单 ' : '添加菜单'"
    v-model="dialogVisible"
    width="30%"
  >
    <el-form :model="permissionParams">
      <el-form-item label="名称">
        <el-input v-model="permissionParams.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="permissionParams.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dailogConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdatePermission,
  reqDeleteMenu,
} from '@/api/acl/menu/index'
import type { Permission, PermissionParams } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

const permissionList = ref<Permission[]>([])
const dialogVisible = ref(false)
const permissionParams = ref<PermissionParams>({
  pid: 0,
  level: 0,
  name: '',
  code: '',
})

const getData = async () => {
  let result = await reqAllPermission()
  if (result.code == 200) {
    permissionList.value = result.data
  }
}
const addPermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(permissionParams.value, {
    pid: 0,
    level: 0,
    name: '',
    code: '',
  })
  delete permissionParams.value.id
  permissionParams.value.level = row.level + 1
  permissionParams.value.pid = row.id
}
const dailogConfirm = async () => {
  let result = await reqAddOrUpdatePermission(permissionParams.value)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage.success(permissionParams.value.id ? '修改成功！' : '添加成功')
    getData()
  }
}
const editPermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(permissionParams.value, row)
}
const deletePermission = async (id: number) => {
  let result = await reqDeleteMenu(id)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
    getData()
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped></style>
