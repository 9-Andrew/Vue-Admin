<template>
  <div>
    <Category></Category>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!store.C3ID"
          v-has="`btn.Spu.add`"
          @click="addSPU"
        >
          添加SPU
        </el-button>
        <el-table :data="SPUList" border style="margin: 20px 0">
          <el-table-column
            label="序号"
            width="80px"
            align="center"
            type="index"
          />
          <el-table-column label="SPU名称" prop="spuName" />
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                v-has="`btn.Spu.addsku`"
                @click="addSKU(row)"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                v-has="`btn.Spu.update`"
                @click="editSPU(row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="InfoFilled"
                v-has="`btn.Spu.skus`"
                @click="showSKUInfo(row.id)"
              ></el-button>
              <el-popconfirm
                :title="`你确认要删除${row.spuName}吗？`"
                icon="Delete"
                width="200px"
                v-has="`btn.Spu.delete`"
                @confirm="deleteSPU(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 10]"
          background
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="sizeChange"
          @current-change="getData"
        />
      </div>
      <SPUForm
        v-show="scene == 1"
        ref="SPU"
        @changeScene="changeScene"
      ></SPUForm>
      <SKUForm
        v-show="scene == 2"
        ref="SKU"
        @changeScene="changeScene"
      ></SKUForm>
      <el-dialog title="SKU列表" v-model="dialogVisible" width="30%">
        <el-table :data="SKUList">
          <el-table-column prop="skuName" label="SKU名称"></el-table-column>
          <el-table-column prop="price" label="SKU价格"></el-table-column>
          <el-table-column prop="weight" label="SKU重量"></el-table-column>
          <el-table-column prop="col.id" label="SKU图片">
            <template v-slot="{ row }">
              <el-image
                :src="row.skuDefaultImg"
                fit="fill"
                :lazy="true"
              ></el-image>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqSPU, reqSKUList, reqDeleteSPU } from '@/api/product/spu/index'
import type { SPU } from '@/api/product/spu/type'
import SKUForm from './SKUForm.vue'
import SPUForm from './SPUForm.vue'
import { ElMessage } from 'element-plus'

const store = useCategoryStore()
const scene = ref(0)
const pageNo = ref(1)
const limit = ref(3)
const total = ref(0)
const SPUList = ref<SPU[]>([])
const SPU = ref()
const SKU = ref()
const dialogVisible = ref(false)
const SKUList = ref([])

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
const addSPU = () => {
  scene.value = 1
  SPU.value.initAddData(store.C3ID)
}
const editSPU = (row: SPU) => {
  scene.value = 1
  SPU.value.initUpdateData(row)
}
const changeScene = (obj: any) => {
  scene.value = obj.scene
  obj.page && (pageNo.value = obj.page)
  getData()
}
const addSKU = (row: SPU) => {
  scene.value = 2
  SKU.value.initAddData(store.C1ID, store.C2ID, row)
}
const showSKUInfo = async (skuId: number) => {
  let result = await reqSKUList(skuId)
  if (result.code == 200) {
    SKUList.value = result.data
    dialogVisible.value = true
  }
}
const deleteSPU = async (skuId: number) => {
  let result = await reqDeleteSPU(skuId)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
    SPUList.value.length == 1 && (pageNo.value = pageNo.value - 1)
    getData()
  }
}
watch(
  () => store.C3ID,
  () => {
    if (!store.C3ID) return
    getData()
  },
)
</script>

<style scoped></style>
