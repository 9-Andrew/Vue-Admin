<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="sku名称">
        <el-input placeholder="SKU名称" v-model="SKUParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          placeholder="价格（元）"
          type="number"
          v-model="SKUParams.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（克）">
        <el-input
          placeholder="重量（克）"
          type="number"
          v-model="SKUParams.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input
          placeholder="sku描述"
          type="textarea"
          v-model="SKUParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            v-for="al in attrList"
            :key="al.id"
            :label="al.attrName"
          >
            <el-select v-model="al.attrIdAndValue">
              <el-option
                v-for="vl in al.attrValueList"
                :key="vl.id"
                :label="vl.valueName"
                :value="`${al.id}:${vl.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            v-for="sal in saleAttrList"
            :key="sal.id"
            :label="sal.saleAttrName"
          >
            <el-select v-model="sal.saleAttrIdAndValue">
              <el-option
                v-for="ssavl in sal.spuSaleAttrValueList"
                :key="ssavl.id"
                :label="ssavl.saleAttrValueName"
                :value="`${sal.id}:${ssavl.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="imgList" border ref="tableRef">
          <el-table-column type="selection" align="center" />
          <el-table-column label="图片">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" alt="" style="height: 150px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="primary" size="default" @click="handler(row)">
                设为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['changeScene'])
import { ref, reactive } from 'vue'
import type { SPU, SaleAttr, SPUImage } from '@/api/product/spu/type'
import type { Attr } from '@/api/product/attr/type'
import { reqSPUImageList, reqSPUSaleAttrList } from '@/api/product/spu/index'
import { reqAttr } from '@/api/product/attr/index'

const attrList = ref<Attr[]>([])
const saleAttrList = ref<SaleAttr[]>([])
const imgList = ref<SPUImage[]>([])
const SKUParams = reactive({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})
const tableRef = ref()
const initAddData = async (
  C1ID: number | string,
  C2ID: number | string,
  row: SPU,
) => {
  const result = await reqAttr(C1ID, C2ID, row.category3Id)
  attrList.value = result.data
  const result2 = await reqSPUSaleAttrList(row.id!)
  saleAttrList.value = result2.data
  const result3 = await reqSPUImageList(row.id!)
  imgList.value = result3.data
  SKUParams.category3Id = row.category3Id as string
  SKUParams.spuId = row.id as unknown as string
  SKUParams.tmId = row.tmId as string
}
const handler = (row: any) => {
  tableRef.value.clearSelection()
  tableRef.value.toggleRowSelection(row, true)
  SKUParams.skuDefaultImg = row.imgUrl
}
const save = () => {
  SKUParams.skuAttrValueList = attrList.value
    .filter((item) => item.attrIdAndValue)
    .reduce((prev: any, next: any) => {
      let [valueId, valueName] = next.attrIdAndValue.split(':')
      prev.push({ valueId, valueName })
      return prev
    }, [])
  SKUParams.skuSaleAttrValueList = saleAttrList.value
    .filter((item) => item.saleAttrIdAndValue)
    .reduce((prev: any, next: any) => {
      let [saleAttrId, saleAttrName] = next.saleAttrIdAndValue.split(':')
      prev.push({ saleAttrId, saleAttrName })
      return prev
    }, [])
}
const cancle = () => {
  emits('changeScene', { scene: 0 })
}

defineExpose({ initAddData })
</script>

<style scoped></style>
