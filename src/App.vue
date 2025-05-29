<template>
  <Header></Header>
  <router-view/>
</template>

<script setup>
import {onMounted, provide, ref} from 'vue'
import {useRouter} from "vue-router";
import Header from './components/Header.vue'
const router = useRouter()

const nome = ref("");

provide('nomeUsuario', {
  setNome: function(valor) {
    nome.value = valor;
  },
  nome: nome.value
})

onMounted(() => {
  router.push('/timetracker')
})
</script>

<style>

</style>