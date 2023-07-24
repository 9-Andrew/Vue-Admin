<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div v-show="scene == 0">
        <el-button type="primary" icon="Plus" @click="addAttr" :disabled="!store.C3ID">
          添加属性
        </el-button>
        <el-table :data="attrList" border stripe style="margin: 20px 0">
          <el-table-column label="序号" type="index" width="100px" align="center" />
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" width="800px">
            <template #="{ row }">
              <el-tag v-for="al in row.attrValueList" :key="al.id" style="margin-right:10px;">{{ al.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="warning" size="small" icon="Edit" @click=""></el-button>
              <el-popconfirm :title="`你确认要删除${row}吗？`" icon="Delete" width="200px" @confirm="">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="addAttrValue">添加属性值</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="attrParams.attrValueList" border stripe style="margin-bottom:20px">
          <el-table-column label="序号" type="index" width="100px" align="center" />
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpadateAttr">保存</el-button>
        <el-button @click="scene = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import useCategoryStore from '@/store/modules/category'
import type { Attr } from '@/api/product/attr/type'
import { reqAddOrUpadateAttr } from '@/api/product/attr/index';
import { ElMessage } from 'element-plus';

const store = useCategoryStore()
let attrList = ref<Attr[]>([])
let scene = ref(0)
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

watch(() => store.C3ID, async () => {
  attrList.value = []
  if (!store.C3ID) return
  attrList.value = await store.getAttr() || []
})
const addAttr = () => {
  scene.value = 1
  attrParams.categoryId = store.C3ID
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
}
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '' })
}
const addOrUpadateAttr = async () => {
  let result = await reqAddOrUpadateAttr(attrParams)
  if (result.code == 200) {
    attrList.value = await store.getAttr() || []
    scene.value = 0
    ElMessage.success(attrParams.id ? '修改成功!' : '保存成功！')
  }
}
</script>

<style scoped></style>
