<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <el-table :data="trademarkList" border style="margin: 20px 0">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column label="品牌名称" prop="tmName" />
        <el-table-column label="品牌LOGO">
          <template v-slot="{ row }">
            <el-image :src="row.logoUrl" fit="contain" :lazy="true" style="height: 90px; min-width: 120px"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template v-slot="{ row }">
            <el-button type="warning" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
            <el-popconfirm :title="`你确认要删除${row.tmName}吗？`" icon="Delete" width="200px"
              @confirm="deleteTrademark(row.id)">
              <template #reference><el-button type="danger" size="small" icon="Delete"></el-button></template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 10]" background
        layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="sizeChange"
        @current-change="getData" />
    </el-card>
    <el-dialog :title="trademarkInfo.id ? '修改品牌' : '添加品牌'" v-model="dialogVisible" width="40%">
      <el-form label-width="110px" style="width: 80%" :model="trademarkInfo" :rules="rules" ref="elFormRef">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkInfo.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleUploadSuccess" :before-upload="beforeUploadSuccess">
            <img v-if="trademarkInfo.logoUrl" :src="trademarkInfo.logoUrl" class="avatar" />
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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqTrademarkList, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark/index'
import type { Records, Trademark } from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'

const pageNo = ref(1)
const limit = ref(3)
const total = ref(0)
const dialogVisible = ref(false)
const elFormRef = ref()
let trademarkList = reactive<Records>([])
let trademarkInfo = reactive<Trademark>({ tmName: '', logoUrl: '' })

const getData = async () => {
  const result = await reqTrademarkList(pageNo.value, limit.value)
  total.value = result.data.total
  trademarkList.splice(0, trademarkList.length, ...result.data.records)
}
const sizeChange = () => {
  pageNo.value = 1
  getData()
}
const addTrademark = () => {
  dialogVisible.value = true
  trademarkInfo.tmName = ''
  trademarkInfo.logoUrl = ''
  delete trademarkInfo.id
  nextTick(() => {
    elFormRef.value.clearValidate()
  })
}
const updateTrademark = (row: any) => {
  Object.assign(trademarkInfo, row)
  dialogVisible.value = true
  nextTick(() => {
    elFormRef.value.clearValidate()
  })
}
const dialogCancle = () => {
  dialogVisible.value = false
}
const dialogConfirm = async () => {
  await elFormRef.value.validate()
  let result = await reqAddOrUpdateTrademark(trademarkInfo)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage.success(trademarkInfo.id ? '修改成功' : '添加成功！')
    trademarkInfo.id || (pageNo.value = 1)
    getData()
  }
}
const handleUploadSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkInfo.logoUrl = response.data
  elFormRef.value.clearValidate('logoUrl')
}
const beforeUploadSuccess: UploadProps['beforeUpload'] = (rawFile) => {
  if (!(rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif')) {
    ElMessage.error('图片格式只能为 JPG|PNG|GIF')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片不能大于4MB!')
    return false
  }
  return true
}
const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('必须上传品牌LOGO！'))
  }
}
let rules = {
  tmName: [{ required: true, min: 2, trigger: 'change', message: '品牌名称至少2个字符！' }],
  logoUrl: [{
    required: true,
    validator: validatorLogoUrl
  }]
}
const deleteTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
  }
  trademarkList.length == 1 && (pageNo.value -= 1)
  getData()
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
