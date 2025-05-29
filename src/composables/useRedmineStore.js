import {ref, reactive} from 'vue'

const config = reactive({host: '', token: '', username: '', password: '', database: ''})
const timeEntries = ref([])
const sprintTasks = ref([])
const storageUsed = ref(0)
const maxStorage = ref(100)

// Host=192.168.0.246;
// Username=redmine;
// Password=redmine!@#;
// Database=redmine <- conexão

export function useRedmineStore() {
    const carregarConfiguracao = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke('get-config')

            Object.assign(config, result)
            return result
        } catch (error) {
            console.error('Erro ao carregar config:', error)
            return null;
        }
    }

    const salvarConfiguracao = async (newConfig) => {
        try {
            await window.electron.ipcRenderer.invoke('save-config', newConfig)

            Object.assign(config, newConfig)
        } catch (error) {
            console.error('Erro ao salvar config:', error)
        }
    }

    const calcularUsoDeMemoria = (entries) => {
        // const dataSize = JSON.stringify(entries).length
        // const usageInMB = (dataSize / (1024 * 1024)) * 100
        // storageUsed.value = Math.min(usageInMB, maxStorage.value)
    }

    const limparMemoriaUtilizada = () => {
        // localStorage.removeItem('time-entries')
        // timeEntries.value = []
        // storageUsed.value = 0
    }

    const testarConexao = async () => {
        try {
            config.nome = "teste"
            await salvarConfiguracao(config)

        } catch (error) {
            console.error(error)
        }
    }

    const atualizarNome = async () => {

    }

    return {
        config,
        timeEntries,
        sprintTasks,
        storageUsed,
        maxStorage,
        limparDados: limparMemoriaUtilizada,
        salvarConfiguracao,
        calcularUsoDeMemoria,
        carregarConfiguracao
    }
}