<script setup>

// import {ChevronLeft, ChevronRight, Clock, Play, Send, Square} from "lucide-vue-next";
import TaskList from "../components/TaskList.vue";
</script>

<template>
  <div class="row py-3">
    <div class="row col">
      <div class="col-3">
        Ticket
      </div>
      <div class="col-5">
        Atividade
      </div>
      <div class="col-4">
        Iniciar
      </div>
      <div class="col-8">
        Descrição
      </div>
    </div>
    <div class="col-2">
      Painel
    </div>
  </div>

  <TaskList></TaskList>

</template>

<style scoped>

</style>