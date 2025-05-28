<template>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRedmineStore} from './composables/useRedmineStore'
import {useRouter} from "vue-router";

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