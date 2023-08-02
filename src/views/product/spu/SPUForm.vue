<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="SPUParams.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="SPUParams.tmId" @change="">
          <el-option v-for="tl in trademarkList" :key="tl.id" :label="tl.tmName" :value="tl.id!">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述" v-model="SPUParams.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload v-model:file-list="imageList as any" action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUploadSuccess">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select v-model="saleAttrIdAndName" :placeholder="surplusAttr.length > 0 ? `还有${surplusAttr.length}个可选` : '无'">
          <el-option v-for="sa in  surplusAttr " :key="sa.id" :label="sa.name" :value="`${sa.id}:${sa.name}`">
          </el-option>
        </el-select>
        <el-button type="primary" icon="Plus" :disabled="!saleAttrIdAndName" class="horizontal-margin"
          @click="addAttr">添加属性</el-button>
        <el-table :data="saleAttrList" border style="margin: 20px 0">
          <el-table-column label="序号" width="80px" align="center" type="index" />
          <el-table-column label="销售属性名称" prop="saleAttrName" />
          <el-table-column label="销售属性值">
            <template v-slot="{ row }">
              <el-tag v-for="( sl, index)  in  row.spuSaleAttrValueList " :key="sl.id" closable
                @close="row.spuSaleAttrValueList.splice(index, 1)" class="horizontal-margin">{{
                  sl.saleAttrValueName
                }}</el-tag>
              <el-input v-if="row.editable" v-model="row.newName" size="small" placeholder="请输入属性值" clearable
                @blur="toView(row)" style="width:100px"></el-input>
              <el-button v-else type="success" size="small" icon="Plus" @click="toEdit(row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ $index }">
              <el-button type="danger" size="small" icon="Delete" @click="saleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="saleAttrList.length == 0" @click="save">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>    

<script lang="ts" setup>
const emits = defineEmits(['changeScene'])
import { ref, computed } from 'vue';
import { reqAllTradmark, reqSPUImageList, reqSPUSaleAttrList, reqAllSaleAttr, reqAddOrUPdateSPU } from '@/api/product/spu/index';
import type { SPU, AllTrademarkResponse, SPUSaleAttrListResponse, HasSaleAttrResponse, SPUImageListResponse, SaleAttr, SPUImage, HasSaleAttr } from '@/api/product/spu/type';
import type { Trademark } from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'

const trademarkList = ref<Trademark[]>([])
const imageList = ref<SPUImage[]>([])
const saleAttrList = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
const SPUParams = ref<SPU>({
  spuName: '',
  description: '',
  category3Id: 0,
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: []
})
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const surplusAttr = computed(() => {
  return allSaleAttr.value.filter(item => {
    return saleAttrList.value.every(item2 => {
      return item2.saleAttrName != item.name
    })
  })
})
const saleAttrIdAndName = ref('')

const cancle = () => {
  emits('changeScene', { scene: 0 })
}
const initUpdateData = async (row: SPU) => {
  SPUParams.value = row
  let result: AllTrademarkResponse = await reqAllTradmark()
  trademarkList.value = result.data
  let result2: SPUImageListResponse = await reqSPUImageList(row.id as number)
  imageList.value = result2.data.map(item => {
    return {
      ...item,
      name: item.imgName,
      url: item.imgUrl
    }
  })
  let result3: SPUSaleAttrListResponse = await reqSPUSaleAttrList(row.id as number)
  saleAttrList.value = result3.data
  let result4: HasSaleAttrResponse = await reqAllSaleAttr()
  allSaleAttr.value = result4.data
}
const initAddData = async (id: number) => {
  Object.assign(SPUParams.value, {
    spuName: '',
    description: '',
    category3Id: 0,
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: []
  })
  imageList.value = []
  saleAttrList.value = []
  saleAttrIdAndName.value = ''
  delete SPUParams.value.id


  SPUParams.value.category3Id = id
  let result: AllTrademarkResponse = await reqAllTradmark()
  trademarkList.value = result.data
  let result4: HasSaleAttrResponse = await reqAllSaleAttr()
  allSaleAttr.value = result4.data
}
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
const handleRemove = () => {

}
const beforeUploadSuccess: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    !(
      rawFile.type == 'image/jpeg' ||
      rawFile.type == 'image/png' ||
      rawFile.type == 'image/gif'
    )
  ) {
    ElMessage.error('图片格式只能为 JPG|PNG|GIF')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片不能大于4MB!')
    return false
  }
  return true
}
const addAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  saleAttrList.value.push({
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  })
  saleAttrIdAndName.value = ''
}
const toEdit = (row: SaleAttr) => {
  row.editable = true
}
const toView = (row: SaleAttr) => {
  if (row.newName == undefined || row.newName!.trim() == '') {
    ElMessage.error('属性值不能为空！')
    return
  }
  const repeat = row.spuSaleAttrValueList.some((item) => item.saleAttrValueName == row.newName)
  if (repeat) {
    ElMessage.error('属性值不能重复！')
    return
  }
  const { newName, baseSaleAttrId } = row
  row.spuSaleAttrValueList.push({ saleAttrValueName: newName!, baseSaleAttrId })
  row.newName = ''
  row.editable = false
}
const save = async () => {
  SPUParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  SPUParams.value.spuSaleAttrList = saleAttrList.value
  let result = await reqAddOrUPdateSPU(SPUParams.value)
  if (result.code == 200) {
    ElMessage.success(SPUParams.value.id ? '修改成功!' : '添加成功!')
    emits('changeScene', SPUParams.value.id ? { scene: 0 } : { scene: 0, page: 1 })
  }
}
defineExpose({ initUpdateData, initAddData })
</script>

<style lang="scss" scoped>
.horizontal-margin {
  margin: 0 5px;
}
</style>