<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <el-table :data="SKUList" border style="margin-bottom: 20px">
      <el-table-column label="序号" width="80" align="center" type="index" />
      <el-table-column
        label="名称"
        width="320"
        prop="skuName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="描述"
        width="320"
        prop="skuDesc"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="图片" width="300">
        <template v-slot="{ row }">
          <el-image
            :src="row.skuDefaultImg"
            fit="scale-down"
            :lazy="true"
            style="max-height: 200px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="130" prop="weight"></el-table-column>
      <el-table-column label="价格" width="130" prop="price"></el-table-column>
      <el-table-column label="操作" width="320" fixed="right" align="center">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Download' : 'Upload'"
            @click="onOrCancleSale(row)"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateSKU"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="viewSKU(row.id)"
          ></el-button>
          <el-popconfirm
            :title="`你确认要删除${row.skuName}吗？`"
            icon="Delete"
            width="200px"
            @confirm="deleteSKU(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[10, 20, 30]"
      background
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="getData"
    />
    <el-drawer
      title="商品详情"
      v-model="drawerVisible"
      direction="rtl"
      size="34%"
    >
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">名称</el-col>
        <el-col :span="16" :offset="0">{{ SKUInfo.skuName }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">描述</el-col>
        <el-col :span="16" :offset="0">{{ SKUInfo.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">价格</el-col>
        <el-col :span="16" :offset="0">￥{{ SKUInfo.price }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">品牌属性</el-col>
        <el-col :span="16" :offset="0">
          <el-tag
            type="danger"
            v-for="s in SKUInfo.skuAttrValueList"
            :key="s.id"
          >
            {{ s.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">销售属性</el-col>
        <el-col :span="16" :offset="0">
          <el-tag
            type="success"
            v-for="s in SKUInfo.skuSaleAttrValueList"
            :key="s.id"
          >
            {{ s.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">商品图片</el-col>
        <el-col :span="16" :offset="0">
          <el-carousel
            height="150px"
            direction="horizontal"
            :autoplay="true"
            :interval="3000"
            :loop="true"
            trigger="hover"
            indicator-position="outside"
            arrow="hover"
          >
            <el-carousel-item
              v-for="item in SKUInfo.skuImageList"
              :key="item.id"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  reqSKUList,
  reqOnSale,
  reqCancleSale,
  reqSKUInfo,
  reqDeleteSKU,
} from '@/api/product/sku/index'
import { ElMessage } from 'element-plus'

const pageNo = ref(1)
const limit = ref(10)
const total = ref(0)
const SKUList = ref([])
const drawerVisible = ref(false)
const SKUInfo = ref<any>({})

const getData = async () => {
  let result = await reqSKUList(pageNo.value, limit.value)
  if (result.code == 200) {
    SKUList.value = result.data.records
    total.value = result.data.total
  }
}
const sizeChange = () => {
  pageNo.value = 1
  getData()
}
const onOrCancleSale = async (row: any) => {
  let result
  if (row.isSale == 1) {
    result = await reqCancleSale(row.id)
  } else {
    result = await reqOnSale(row.id)
  }
  if (result.code == 200) {
    ElMessage.success(row.isSale == 1 ? '下架成功!' : '上架成功!')
    SKUList.value.length == 1 && (pageNo.value = pageNo.value - 1)
    getData()
  }
}
const updateSKU = () => {
  ElMessage.info('正在开发中……')
}
const viewSKU = async (id: number) => {
  drawerVisible.value = true
  let result = await reqSKUInfo(id)
  if (result.code == 200) {
    SKUInfo.value = result.data
  }
}
const deleteSKU = async (id: number) => {
  let result = await reqDeleteSKU(id)
  if (result.code == 200) {
    ElMessage.success('删除成功！')
    getData()
  } else {
    ElMessage.error(result.data)
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped>
.el-row {
  margin: 12px 0;
}

.el-tag {
  margin: 8px 5px;
}
</style>
