import {ref, reactive} from 'vue'

const config = reactive({url: '', token: ''})
const timeEntries = ref([])
const sprintTasks = ref([])
const storageUsed = ref(0)
const maxStorage = ref(100)

// Salvar as configs em um arquivo

export function useRedmineStore() {
    const carregarConfiguracao = () => {
        try {
            // const savedConfig = localStorage.getItem('redmine-config')
            // if (savedConfig) {
            //     Object.assign(config, JSON.parse(savedConfig))
            // }

            return config;
        } catch (error) {
            // Substituir por Alert
            console.error("Error loading config:", error)
        }
    }

    const salvarConfiguracao = (newConfig) => {
        Object.assign(config, newConfig)
        // localStorage.setItem('redmine-config', JSON.stringify(config))
    }

    const calcularUsoDeMemoria = (entries) => {
        // const dataSize = JSON.stringify(entries).length
        // const usageInMB = (dataSize / (1024 * 1024)) * 100
        // storageUsed.value = Math.min(usageInMB, maxStorage.value)
    }

    const limparDados = () => {
        // localStorage.removeItem('time-entries')
        // timeEntries.value = []
        // storageUsed.value = 0
    }

    return {
        config,
        timeEntries,
        sprintTasks,
        storageUsed,
        maxStorage,
        limparDados,
        salvarConfiguracao,
        calcularUsoDeMemoria,
        carregarConfiguracao
    }
}