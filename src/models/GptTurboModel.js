export default class GptTurboModel {
    #baseUrl = 'https://api.openai.com/v1/chat/completions'
    #defaultSettings = {}
    #bodySettings = {}
    #serviceMessages = []
    #messages = []
    answer = ''

    constructor(apiKey) {
        this.#defaultSettings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        }
        this.#bodySettings = {
            model: 'gpt-3.5-turbo',
            max_tokens: 2048,
            temperature: 1,
            n: 1,
            messages: [],
            stream: false,
        }
    }

    initChat(initialPrompt = '', messages = []) {
        const defaultConfigMessages = [
            {
                role: 'system',
                content: initialPrompt,
            },
            {
                role: 'assistant',
                content: 'Договорились!',
            },
        ]

        if (initialPrompt.length > 0) {
            this.#serviceMessages = defaultConfigMessages
            this.#bodySettings.messages.push(...this.#serviceMessages)
        }

        if (messages.length > 0) {
            this.#messages.push(...messages)
            this.#bodySettings.messages.push(...this.#messages)
        }
    }

    getMessages() {
        return this.#messages
    }

    getLastMessage() {
        return this.#messages[this.#messages.length - 1]
    }

    async getAnswer(prompt) {
        this.#_cleanAnswer()
        this.#_updateMessages('user', prompt)

        try {
            const response = await fetch(this.#baseUrl, {
                ...this.#defaultSettings,
                body: JSON.stringify(this.#bodySettings),
            })
            const data = await response.json()

            this.answer = data.choices[0].message.content
            this.#_updateMessages('assistant', this.answer)

            return this.answer
        } catch (error) {
            console.error(error)
        }
    }

    async getStreamAnswer(prompt, callback) {
        this.#bodySettings.stream = true
        this.#_cleanAnswer()
        this.#_updateMessages('user', prompt)

        try {
            const response = await fetch(this.#baseUrl, {
                ...this.#defaultSettings,
                body: JSON.stringify(this.#bodySettings),
            })
            const reader = response.body.getReader()

            await this.#_readStream(reader, callback)
            this.#_updateMessages('assistant', this.answer)
        } catch (error) {
            console.error(error)
        }
    }

    async #_readStream(reader, callback) {
        const alwaysRun = true

        while (alwaysRun) {
            const { value, done } = await reader.read()
            const decoder = new TextDecoder('utf-8')
            const lines = decoder
                .decode(value)
                .split('\n')
                .filter(line => line.trim())

            lines.forEach(line => {
                if (line.includes('DONE')) {
                    callback(this.answer, true)
                    return
                }

                const preparedString = `{${this.#_parseStreamingString(line)}}`
                const lineObject = JSON.parse(preparedString)
                const { delta } = lineObject.choices[0]

                if (delta?.content) {
                    this.answer += delta.content
                    callback(this.answer, false)
                }
            })

            if (done) break
        }
    }

    #_parseStreamingString(str) {
        const startIndex = str.indexOf('{') // находим индекс первой открывающей скобки
        const endIndex = str.lastIndexOf('}') // находим индекс последней закрывающей скобки

        if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
            // если скобки не найдены или порядок скобок неправильный
            return null
        }

        const result = str.substring(startIndex + 1, endIndex) // получаем подстроку между скобками

        return result.trim() // удаляем пробелы в начале и конце строки
    }

    #_updateMessages(role, content) {
        this.#messages.push({
            role,
            content,
        })
        this.#bodySettings.messages.push({
            role,
            content,
        })
    }

    #_cleanAnswer() {
        this.answer = ''
    }
}
