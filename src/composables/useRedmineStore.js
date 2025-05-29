import {ref, reactive} from 'vue'

const config = reactive({url: '', token: ''})
const timeEntries = ref([])
const sprintTasks = ref([])
const storageUsed = ref(0)
const maxStorage = ref(100)

export function useRedmineStore() {
    const carregarConfiguracao = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke('get-config')

            Object.assign(config, result)
        } catch (error) {
            console.error('Erro ao carregar config:', error)
        }
    }

    const salvarConfiguracao = async (newConfig) => {
        try {
            console.log(newConfig)
            await window.electron.ipcRenderer.invoke('save-config', newConfig)
            console.log(config)
            Object.assign(config, newConfig)
            console.log(config)
        } catch (error) {
            console.error('Erro ao salvar config:', error)
        }
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