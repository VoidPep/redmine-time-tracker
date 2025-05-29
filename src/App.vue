<template>
  <Header></Header>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRouter} from "vue-router";
import Header from './components/Header.vue'
const router = useRouter()

onMounted(() => {
  router.push('/timetracker')
})
</script>

<style>

</style>