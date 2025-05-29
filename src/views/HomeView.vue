<template>
  <Button label="Verify"/>
<!--  <div class="min-h-screen bg-gray-50">-->

<!--    <div class="container mx-auto p-4 max-w-6xl">-->
<!--      <div class="bg-white rounded-lg shadow">-->
<!--        <div class="border-b border-gray-200">-->
<!--          <nav class="flex">-->
<!--            <router-link-->
<!--                to="/timetracker"-->
<!--                class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"-->
<!--                :class="$route.name === 'TimeTracker'-->
<!--                ? 'border-blue-500 text-blue-600'-->
<!--                : 'border-transparent text-gray-500 hover:text-gray-700'"-->
<!--            >-->
<!--              Apontamento de Horas-->
<!--            </router-link>-->
<!--            <router-link-->
<!--                to="/tasks"-->
<!--                class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"-->
<!--                :class="$route.name === 'Tasks'-->
<!--                ? 'border-blue-500 text-blue-600'-->
<!--                : 'border-transparent text-gray-500 hover:text-gray-700'"-->
<!--            >-->
<!--              Tarefas da Sprint-->
<!--            </router-link>-->
<!--          </nav>-->
<!--        </div>-->

<!--        <div class="p-6">-->
<!--          <router-view/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import Button from "primevue/button"
</script>