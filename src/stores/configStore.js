import fs from 'fs'
import path from 'path'

const configFilePath = path.join(process.cwd(), 'redmine-config.json')

export const configStore = {
    config: { url: '', token: '' },

    loadConfig() {
        try {
            if (fs.existsSync(configFilePath)) {
                const data = fs.readFileSync(configFilePath, 'utf-8')
                this.config = JSON.parse(data)
                return this.config;
            } else {
                return null
            }
        } catch (err) {
            console.error('Erro ao carregar configuração:', err)
        }
    },

    saveConfig(newConfig) {
        try {
            this.config = { ...this.config, ...newConfig }
            fs.writeFileSync(configFilePath, JSON.stringify(this.config, null, 4), 'utf-8')
        } catch (err) {
            console.error('Erro ao salvar configuração:', err)
        }
    },

    getConfig() {
        return this.config
    }
}