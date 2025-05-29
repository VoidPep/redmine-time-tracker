<script setup>
import {onMounted, ref} from 'vue';

const nome = ref("")

function getNome() {
  return "Teste"; // pegar da store
}

onMounted(() => {
  nome.value = getNome();
})
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>{{ nome }}</div>

    <router-link to="/config" class="text-white">
      <i class="fa fa-cog"></i>
    </router-link>
  </div>
</template>

<style scoped>

</style>