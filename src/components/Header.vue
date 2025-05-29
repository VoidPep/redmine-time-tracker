<script setup>
import {inject} from 'vue';

const {nome} = inject('nomeUsuario');

</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>{{ nome }}</div>

    <div class="d-flex gap-2">
      <router-link to="/timetracker" class="text-white">
        <i class="fa fa-clock-o"></i>
      </router-link>
      <router-link to="/config" class="text-white">
        <i class="fa fa-cog"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>