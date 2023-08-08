<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form inline class="form">
        <el-form-item label="用户名：">
          <el-input v-model="username" placeholder="请输入搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button @click="settingStore.refresh = !settingStore.refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-top:20px">
      <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
      <el-button type="danger" size="default" @click="deleteUsers" :disabled="deleteList.length == 0">批量删除</el-button>
      <el-table :data="UserList" border style="margin: 10px 0" @selection-change="selectChange">
        <el-table-column width="80" align="center" type="selection" />
        <el-table-column label="#" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="ID" width="120" prop="id" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名字" prop="name"></el-table-column>
        <el-table-column label="用户名称" prop="username"></el-table-column>
        <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template v-slot="{ row }">
            <el-button type="success" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="warning" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
            <el-popconfirm :title="`你确认要删除${row.name}吗？`" icon="Delete" width="240px" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 9]" background
        layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="sizeChange"
        @current-change="getData" />
    </el-card>
    <el-drawer :title="userParams.id ? '修改用户' : '添加用户'" v-model="drawerVisible">
      <el-form :model="userParams" :rules="rules" label-width="80px" ref="Form">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item v-show="!userParams.id" label="用户密码" prop="password">
          <el-input v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </template>
    </el-drawer>
    <el-drawer title="'分配角色（职位）'" v-model="drawerVisible2">
      <el-form label-width="80px">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="userParams.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位列表" prop="username">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="assignRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="r in allRolesList" :key="r.id" :label="r">{{ r.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel2">取消</el-button>
        <el-button type="primary" @click="confirm2">确认</el-button>
      </template>
    </el-drawer>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { reqUser, reqAddOrUpdateUser, reqUserRole, reqSetRole, reqDeleteUser, reqDeleteUsers } from '@/api/acl/user/index';
import type { User, UserRole } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
import useLayoutSettingStore from '@/store/modules/setting'

const settingStore = useLayoutSettingStore()
const pageNo = ref(1)
const limit = ref(3)
const total = ref(0)
const UserList = ref<User[]>([])
const username = ref('')
const rules = ref({
  username: [{ required: true, min: 5, trigger: 'blur', message: '昵称至少5位' }],
  name: [{ required: true, min: 5, trigger: 'blur', message: '用户名至少5位' }],
  password: [{ required: true, min: 5, trigger: 'blur', message: '密码至少5位' }]
})
const userParams = ref<User>({ name: '', username: '', password: '' })
const drawerVisible = ref(false)
const drawerVisible2 = ref(false)
const Form = ref()
const allRolesList = ref<UserRole[]>([])
const assignRoles = ref<UserRole[]>([])
const checkAll = ref(false)
const isIndeterminate = ref(true)
const deleteList = ref([])

const getData = async () => {
  let result = await reqUser(pageNo.value, limit.value, username.value)
  if (result.code == 200) {
    UserList.value = result.data.records
    total.value = result.data.total
  }
}
const sizeChange = () => {
  pageNo.value = 1
  getData()
}
const addUser = () => {
  drawerVisible.value = true
  nextTick(() => {
    Object.assign(userParams.value, { id: '', name: '', username: '', password: '' })
    Form.value.clearValidate()
  })
}
const editUser = (row: User) => {
  Object.assign(userParams.value, row)
  nextTick(() => {
    Form.value.clearValidate()
  })
  drawerVisible.value = true
}
const cancel = () => {
  drawerVisible.value = false
}
const confirm = async () => {
  await Form.value.validate()
  let result = await reqAddOrUpdateUser(userParams.value)
  if (result.code == 200) {
    drawerVisible.value = false
    ElMessage.success(userParams.value.id ? '修改成功！' : '添加成功！')
    userParams.value.id || (pageNo.value = 1)
    window.location.reload()
  } else {
    ElMessage.error(result.message)
  }
}
const setRole = async (row: User) => {
  Object.assign(userParams.value, row)
  drawerVisible2.value = true
  let result = await reqUserRole(row.id as number)
  if (result.code == 200) {
    allRolesList.value = result.data.allRolesList
    assignRoles.value = result.data.assignRoles
  }
}
const handleCheckAllChange = (val: any) => {
  assignRoles.value = val ? allRolesList.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: any[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRolesList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRolesList.value.length
}
const confirm2 = async () => {
  let result = await reqSetRole({
    roleIdList: assignRoles.value.map(i => i.id as number),
    userId: userParams.value.id as number
  })
  if (result.code == 200) {
    drawerVisible2.value = false
    ElMessage.success('分配角色成功！')
    getData()
  }
}
const cancel2 = () => {
  drawerVisible2.value = false
}
const deleteUser = async (id: number) => {
  let result = await reqDeleteUser(id)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
    UserList.value.length == 1 && (pageNo.value = pageNo.value - 1)
    getData()
  }
}
const selectChange = (selection: any) => {
  deleteList.value = selection.map((item: { id: any; }) => item.id)
}
const deleteUsers = async () => {
  let result = await reqDeleteUsers(deleteList.value)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
    UserList.value.length == deleteList.value.length && (pageNo.value = pageNo.value - 1)
    getData()
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
}
</style>
