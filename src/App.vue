<template>
  <Header></Header>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRedmineStore} from './composables/useRedmineStore'
import {useRouter} from "vue-router";
import Header from './components/Header.vue'

const router = useRouter()
const store = useRedmineStore()

onMounted(() => {
  const {token, url} = store.carregarConfiguracao()

  if (!token || !url) {
    router.push('/config')
  }
})
</script>

<style>

</style>