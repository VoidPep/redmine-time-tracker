<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="showConfig || !config.url || !config.token" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center gap-2 mb-4">
            <Settings class="h-5 w-5" />
            <h2 class="text-xl font-semibold">Configurações do Redmine</h2>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-2">
              <AlertTriangle class="h-4 w-4 text-yellow-600" />
              <p class="text-yellow-800">É necessário configurar a URL e token do Redmine para usar o sistema.</p>
            </div>
          </div>

          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium mb-2">URL do Redmine</label>
              <input
                  v-model="config.url"
                  type="text"
                  placeholder="https://redmine.exemplo.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Token de API</label>
              <input
                  v-model="config.token"
                  type="password"
                  placeholder="Seu token de API do Redmine"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div v-if="config.url && config.token" class="space-y-6 mb-6">
            <div>
              <h3 class="text-lg font-medium mb-4">Gerenciamento de Dados</h3>

              <div class="space-y-2 mb-4">
                <label class="block text-sm font-medium">Uso de Armazenamento</label>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${(storageUsed / maxStorage) * 100}%` }"
                  ></div>
                </div>
                <p class="text-sm text-gray-600">
                  {{ storageUsed.toFixed(2) }} MB / {{ maxStorage }} MB utilizados
                </p>
              </div>

              <button
                  @click="clearData"
                  class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 class="h-4 w-4" />
                Excluir Todos os Dados
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button
                v-if="config.url && config.token"
                @click="showConfig = false"
                class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
                @click="saveConfig"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="container mx-auto p-4 max-w-6xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Redmine Time Tracker</h1>
        <button
            @click="showConfig = true"
            class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Settings class="h-4 w-4" />
          Configurações
        </button>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow">
        <div class="border-b border-gray-200">
          <nav class="flex">
            <button
                @click="activeTab = 'timetracker'"
                :class="[
                'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'timetracker'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              Apontamento de Horas
            </button>
            <button
                @click="activeTab = 'tasks'"
                :class="[
                'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              Tarefas da Sprint
            </button>
          </nav>
        </div>

        <!-- Time Tracker Tab -->
        <div v-if="activeTab === 'timetracker'" class="p-6 space-y-6">
          <!-- Timer Card -->
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center gap-2 mb-4">
              <Clock class="h-5 w-5" />
              <h2 class="text-lg font-semibold">Controle de Tempo</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium mb-2">Ticket</label>
                <input
                    v-model="currentEntry.ticket"
                    :disabled="isTracking"
                    type="text"
                    placeholder="Número do ticket"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Atividade</label>
                <select
                    v-model="currentEntry.activity"
                    :disabled="isTracking"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Selecione a atividade</option>
                  <option value="desenvolvimento">Desenvolvimento</option>
                  <option value="analise">Análise</option>
                  <option value="teste">Teste</option>
                  <option value="documentacao">Documentação</option>
                  <option value="reuniao">Reunião</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Hora Inicial (opcional)</label>
                <input
                    v-model="customStartTime"
                    :disabled="isTracking"
                    type="time"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                  v-model="currentEntry.description"
                  :disabled="isTracking"
                  placeholder="Descrição do trabalho realizado"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              ></textarea>
            </div>

            <div class="flex items-center justify-between">
              <div class="text-3xl font-mono font-bold text-gray-900">
                {{ formatTime(elapsedTime) }}
              </div>

              <div class="flex gap-2">
                <button
                    v-if="!isTracking"
                    @click="startTracking"
                    class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Play class="h-4 w-4" />
                  Iniciar
                </button>
                <button
                    v-else
                    @click="stopTracking"
                    class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Square class="h-4 w-4" />
                  Parar
                </button>
              </div>
            </div>
          </div>

          <!-- Time Entries -->
          <div class="bg-white border border-gray-200 rounded-lg">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold mb-4">Horas Lançadas</h2>
              <div class="flex items-center gap-2">
                <button
                    @click="changeDate(-1)"
                    class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft class="h-4 w-4" />
                </button>

                <input
                    v-model="selectedDateString"
                    type="date"
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    @click="changeDate(1)"
                    class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="p-6">
              <div class="overflow-x-auto mb-4">
                <table class="w-full">
                  <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-2 px-4 font-medium text-gray-900">Hora Inicial</th>
                    <th class="text-left py-2 px-4 font-medium text-gray-900">Hora Final</th>
                    <th class="text-left py-2 px-4 font-medium text-gray-900">Diferença</th>
                    <th class="text-left py-2 px-4 font-medium text-gray-900">Ticket</th>
                    <th class="text-left py-2 px-4 font-medium text-gray-900">Atividade</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="entry in getDayEntries(selectedDate)"
                      :key="entry.id"
                      class="border-b border-gray-100"
                  >
                    <td class="py-2 px-4">{{ formatTimeOnly(entry.startTime) }}</td>
                    <td class="py-2 px-4">{{ entry.endTime ? formatTimeOnly(entry.endTime) : '-' }}</td>
                    <td class="py-2 px-4">{{ entry.duration ? formatTime(entry.duration) : '-' }}</td>
                    <td class="py-2 px-4">{{ entry.ticket }}</td>
                    <td class="py-2 px-4">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {{ entry.activity }}
                        </span>
                    </td>
                  </tr>
                  <tr v-if="getDayEntries(selectedDate).length === 0">
                    <td colspan="5" class="py-8 px-4 text-center text-gray-500">
                      Nenhuma entrada encontrada para esta data
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div class="flex gap-2">
                <button
                    @click="sendDayHours"
                    class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Send class="h-4 w-4" />
                  Enviar Horas do Dia
                </button>
                <button
                    @click="sendWeekHours"
                    class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Send class="h-4 w-4" />
                  Enviar Horas da Semana
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tasks Tab -->
        <div v-if="activeTab === 'tasks'" class="p-6">
          <div class="mb-4">
            <h2 class="text-lg font-semibold">Tarefas da Sprint Atual</h2>
            <p class="text-gray-600">Tarefas atribuídas a você na sprint mais recente</p>
          </div>

          <div class="space-y-4">
            <div
                v-for="task in sprintTasks"
                :key="task.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 class="font-medium text-gray-900">
                  #{{ task.id }} - {{ task.subject }}
                </h3>
                <p class="text-sm text-gray-600">Atribuído para: {{ task.assignedTo }}</p>
              </div>
              <span
                  :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  task.status === 'Em Progresso'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ task.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import {
  Settings,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  Send,
  Trash2,
  Clock,
  AlertTriangle
} from 'lucide-vue-next'

// Reactive data
const activeTab = ref('timetracker')
const showConfig = ref(false)
const config = reactive({ url: '', token: '' })
const currentEntry = reactive({ ticket: '', activity: '', description: '' })
const isTracking = ref(false)
const startTime = ref(null)
const elapsedTime = ref(0)
const timeEntries = ref([])
const selectedDate = ref(new Date())
const sprintTasks = ref([])
const storageUsed = ref(0)
const maxStorage = ref(100)
const customStartTime = ref('')

// Computed
const selectedDateString = computed({
  get: () => selectedDate.value.toISOString().split('T')[0],
  set: (value) => selectedDate.value = new Date(value)
})

// Timer interval
let timerInterval = null

// Watch for tracking state
watch(isTracking, (newValue) => {
  if (newValue && startTime.value) {
    timerInterval = setInterval(() => {
      elapsedTime.value = Date.now() - startTime.value.getTime()
    }, 1000)
  } else {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }
})

// Methods
const loadConfig = () => {
  const savedConfig = localStorage.getItem('redmine-config')
  const savedEntries = localStorage.getItem('time-entries')

  if (savedConfig) {
    const parsedConfig = JSON.parse(savedConfig)
    Object.assign(config, parsedConfig)

    if (!parsedConfig.url || !parsedConfig.token) {
      showConfig.value = true
    } else {
      loadSprintTasks()
    }
  } else {
    showConfig.value = true
  }

  if (savedEntries) {
    const entries = JSON.parse(savedEntries).map(entry => ({
      ...entry,
      startTime: new Date(entry.startTime),
      endTime: entry.endTime ? new Date(entry.endTime) : undefined,
    }))
    timeEntries.value = entries
    calculateStorageUsage(entries)
  }
}

const loadSprintTasks = () => {
  // Simulação de tarefas da sprint
  sprintTasks.value = [
    { id: '12345', subject: 'Implementar autenticação', status: 'Em Progresso', assignedTo: 'Usuário Atual' },
    { id: '12346', subject: 'Corrigir bug no formulário', status: 'Novo', assignedTo: 'Usuário Atual' },
    { id: '12347', subject: 'Atualizar documentação', status: 'Em Progresso', assignedTo: 'Usuário Atual' },
  ]
}

const saveConfig = () => {
  localStorage.setItem('redmine-config', JSON.stringify(config))
  showConfig.value = false
  if (config.url && config.token) {
    loadSprintTasks()
  }
}

const startTracking = () => {
  if (!currentEntry.ticket || !currentEntry.activity) {
    alert('Preencha o ticket e atividade antes de iniciar')
    return
  }

  const now = customStartTime.value
      ? new Date(`${selectedDateString.value}T${customStartTime.value}`)
      : new Date()

  startTime.value = now
  isTracking.value = true
  elapsedTime.value = 0
}

const stopTracking = () => {
  if (!startTime.value) return

  const endTime = new Date()
  const duration = endTime.getTime() - startTime.value.getTime()

  const newEntry = {
    id: Date.now().toString(),
    startTime: startTime.value,
    endTime,
    ticket: currentEntry.ticket,
    activity: currentEntry.activity,
    description: currentEntry.description,
    duration,
  }

  const updatedEntries = [...timeEntries.value, newEntry]
  timeEntries.value = updatedEntries
  localStorage.setItem('time-entries', JSON.stringify(updatedEntries))
  calculateStorageUsage(updatedEntries)

  isTracking.value = false
  startTime.value = null
  elapsedTime.value = 0
  Object.assign(currentEntry, { ticket: '', activity: '', description: '' })
  customStartTime.value = ''
}

const calculateStorageUsage = (entries) => {
  const dataSize = JSON.stringify(entries).length
  const usageInMB = (dataSize / (1024 * 1024)) * 100 // Simulação
  storageUsed.value = Math.min(usageInMB, maxStorage.value)
}

const clearData = () => {
  localStorage.removeItem('time-entries')
  timeEntries.value = []
  storageUsed.value = 0
}

const formatTime = (ms) => {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const formatTimeOnly = (date) => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

const getDayEntries = (date) => {
  const dateStr = formatDate(date)
  return timeEntries.value.filter(entry => formatDate(entry.startTime) === dateStr)
}

const getWeekEntries = (date) => {
  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - date.getDay() + 1) // Segunda-feira
  weekStart.setHours(0, 0, 0, 0)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6) // Domingo
  weekEnd.setHours(23, 59, 59, 999)

  return timeEntries.value.filter(entry =>
      entry.startTime >= weekStart && entry.startTime <= weekEnd
  )
}

const changeDate = (days) => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + days)
  selectedDate.value = newDate
}

const sendDayHours = () => {
  const dayEntries = getDayEntries(selectedDate.value)
  console.log('Enviando horas do dia:', dayEntries)
  alert(`${dayEntries.length} entradas do dia ${selectedDate.value.toLocaleDateString('pt-BR')} seriam enviadas para o Redmine`)
}

const sendWeekHours = () => {
  const weekEntries = getWeekEntries(selectedDate.value)
  console.log('Enviando horas da semana:', weekEntries)
  alert(`${weekEntries.length} entradas da semana seriam enviadas para o Redmine`)
}

// Lifecycle
onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>