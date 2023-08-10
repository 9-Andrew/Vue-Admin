<template>
  <div class="container">
    <div class="screen" ref="screen">
      <Header></Header>
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from './components/header/index.vue'
import Main from './components/main/index.vue'
import '@/assets/font/font.css'

const screen = ref()

const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
const screenScale = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
onMounted(() => {
  screenScale()
  window.addEventListener('resize', screenScale)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', screenScale)
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png);

  .screen {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: top left;
  }
}
</style>
