<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form inline class="form">
        <el-form-item label="职位搜索：">
          <el-input v-model="rolename" placeholder="请输入职位关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button @click="settingStore.refresh = !settingStore.refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-top:20px">
      <el-button type="primary" size="default" @click="addUser">添加角色</el-button>
      <el-table :data="RoleList" border style="margin: 10px 0">
        <el-table-column label="#" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="ID" width="120" prop="id" show-overflow-tooltip></el-table-column>
        <el-table-column label="职位名字" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template v-slot="{ row }">
            <el-button type="success" size="small" icon="User" @click="setRole(row)">分配权限</el-button>
            <el-button type="warning" size="small" icon="Edit" @click="editRole(row)">编辑</el-button>
            <el-popconfirm :title="`你确认要删除${row.roleName}吗？`" icon="Delete" width="240px" @confirm="deleteUser(row.id)">
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
    <el-dialog :title="roleParams.id ? '修改角色' : '添加角色'" v-model="dialogVisible">
      <el-form :model="roleParams" :rules="rules" ref="Form">
        <el-form-item label="角色名称" prop="roelName">
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </template>
    </el-dialog>
    <el-drawer title="分配权限" v-model="drawerVisible">
      <el-tree :data="menuList" node-key="id" :props="treeProps" :default-checked-keys="defaultChecked"
        :show-checkbox="true" :highlight-current="true" :default-expand-all="true" ref="Tree" @node-click=""></el-tree>
      <template #footer>
        <el-button @click="cancel2">取消</el-button>
        <el-button type="primary" @click="confirm2">确认</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { reqRole, reqAddOrUpdateRole, reqMenu, reqAssign, reqDeleteRole } from '@/api/acl/role/index';
import type { Role, Menu } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
import useLayoutSettingStore from '@/store/modules/setting'

const settingStore = useLayoutSettingStore()
const pageNo = ref(1)
const limit = ref(3)
const total = ref(0)
const RoleList = ref<Role[]>([])
const rolename = ref('')
const rules = ref({
  roleName: [{ required: true, min: 2, trigger: 'blur', message: '职位名称至少3位' }]
})
const roleParams = ref<Role>({ roleName: '' })
const dialogVisible = ref(false)
const drawerVisible = ref(false)
const Form = ref()
const menuList = ref<Menu[]>([])
const treeProps = {
  label: 'name',
  children: 'children'
}
const defaultChecked = ref<number[]>([])
const Tree = ref()

const getData = async () => {
  let result = await reqRole(pageNo.value, limit.value, rolename.value)
  if (result.code == 200) {
    RoleList.value = result.data.records
    total.value = result.data.total
  }
}
const sizeChange = () => {
  pageNo.value = 1
  getData()
}
const addUser = () => {
  dialogVisible.value = true
  nextTick(() => {
    Object.assign(roleParams.value, { id: '', name: '', username: '', password: '' })
    Form.value.clearValidate()
  })
}
const editRole = (row: Role) => {
  Object.assign(roleParams.value, row)
  nextTick(() => {
    Form.value.clearValidate()
  })
  dialogVisible.value = true
}
const cancel = () => {
  dialogVisible.value = false
}
const confirm = async () => {
  await Form.value.validate()
  let result = await reqAddOrUpdateRole(roleParams.value)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage.success(roleParams.value.id ? '修改成功！' : '添加成功！')
    roleParams.value.id || (pageNo.value = 1)
  } else {
    ElMessage.error(result.message)
  }
}
const setRole = async (row: Role) => {
  Object.assign(roleParams.value, row)
  drawerVisible.value = true
  let result = await reqMenu(row.id as number)
  if (result.code == 200) {
    menuList.value = result.data
  }
  defaultChecked.value = filterCheckArr(menuList.value, [])

}
const confirm2 = async () => {
  let arr = [...Tree.value.getCheckedKeys(), ...Tree.value.getHalfCheckedNodes().map((i: any) => i.id)]
  let result: any = await reqAssign(roleParams.value.id as number, arr)
  if (result.code == 200) {
    drawerVisible.value = false
    ElMessage.success('分配权限成功！')
  }
}
const cancel2 = () => {
  drawerVisible.value = false
}
const deleteUser = async (id: number) => {
  let result = await reqDeleteRole(id)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
    RoleList.value.length == 1 && (pageNo.value = pageNo.value - 1)
    getData()
  }
}
const filterCheckArr = (data: any, initArr: number[]) => {
  data.forEach((item: any) => {
    if (item.level == 4 && item.select == true) {
      initArr.push(item.id)
    } else {
      filterCheckArr(item.children, initArr)
    }
  })
  return initArr
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
