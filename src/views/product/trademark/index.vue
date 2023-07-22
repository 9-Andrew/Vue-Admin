<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <el-table :data="trademarkList" border style="margin: 20px 0">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template v-slot="{ row }">
          <el-image :src="row.logoUrl" fit="contain" :lazy="true" style="height: 90px;min-width: 120px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <el-button type="warning" size="small" icon="Edit" @click="updateTrademark"></el-button>
        <el-button type="danger" size="small" icon="Delete"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 10]" background
      layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="sizeChange"
      @current-change="getData" />
  </el-card>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%" before-close="">
    <el-form label-width="80px" style="width:80%">
      <el-form-item label="品牌名称">
        <el-input placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO">
        <el-upload class="avatar-uploader" action="" :show-file-list="false">
          <img v-if="false" src="" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="dialogCancle">取消</el-button>
        <el-button type="primary" @click="dialogConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { reqTrademarkList } from '@/api/product/trademark/index';
import type { Records } from '@/api/product/trademark/type';

const pageNo = ref(1)
const limit = ref(3)
const total = ref(0)
const dialogTitle = ref('添加品牌')
const dialogVisible = ref(false)
let trademarkList = reactive<Records>([])

const getData = async () => {
  const result = await reqTrademarkList(pageNo.value, limit.value)
  total.value = result.data.total
  trademarkList = result.data.records
}
const sizeChange = () => {
  pageNo.value = 1
  getData()
}
const addTrademark = () => {
  dialogTitle.value = '添加品牌'
  dialogVisible.value = true
}
const updateTrademark = () => {
  dialogTitle.value = '修改品牌'
  dialogVisible.value = true
}
const dialogCancle = () => {
  dialogVisible.value = false
}
const dialogConfirm = () => {
  dialogVisible.value = false
}
onMounted(() => {
  getData()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
