<template>
  <div>
    <Category></Category>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-button type="primary" icon="Plus" :disabled="!store.C3ID" @click="">
        添加SPU
      </el-button>
      <el-table :data="SPUList" border style="margin: 20px 0">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column label="SPU名称" prop="spuName" />
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" icon="Plus" @click=""></el-button>
            <el-button type="warning" size="small" icon="Edit" @click=""></el-button>
            <el-button type="info" size="small" icon="InfoFilled" @click=""></el-button>
            <el-popconfirm :title="`你确认要删除${row}吗？`" icon="Delete" width="200px" @confirm="">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 10]" background
        layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="sizeChange" @current-change="getData" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import useCategoryStore from '@/store/modules/category'
import { reqSPU } from '@/api/product/spu/index'
import type { SPU } from '@/api/product/spu/type';

const store = useCategoryStore()
const pageNo = ref(1)
const limit = ref(3)
const total = ref(0)
const SPUList = ref<SPU[]>([])

const getData = async () => {
  let result = await reqSPU(pageNo.value, limit.value, store.C3ID)
  total.value = result.data.total
  if (result.code == 200) {
    SPUList.value = result.data.records
  }
}
const sizeChange = () => {
  pageNo.value = 1
  getData()
}
watch(() => store.C3ID, () => {
  if (!store.C3ID) return
  getData()
})
</script>

<style scoped></style>
