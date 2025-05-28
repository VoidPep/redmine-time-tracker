<script setup>

</script>

<template>
  <div class="mb-4">
    <h2 class="text-lg font-semibold">Tarefas da Sprint Atual</h2>
    <p class="text-gray-600">Tarefas atribuídas a você na sprint mais recente</p>
  </div>

  <div class="space-y-4">
<!--    <div-->
<!--        v-for="task in sprintTasks"-->
<!--        :key="task.id"-->
<!--        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"-->
<!--    >-->
<!--      <div>-->
<!--        <h3 class="font-medium text-gray-900">-->
<!--          #{{ task.id }} - {{ task.subject }}-->
<!--        </h3>-->
<!--        <p class="text-sm text-gray-600">Atribuído para: {{ task.assignedTo }}</p>-->
<!--      </div>-->
<!--      <span-->
<!--          :class="[-->
<!--                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',-->
<!--                  task.status === 'Em Progresso'-->
<!--                    ? 'bg-green-100 text-green-800'-->
<!--                    : 'bg-gray-100 text-gray-800'-->
<!--                ]"-->
<!--      >-->
<!--                {{ task.status }}-->
<!--              </span>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>