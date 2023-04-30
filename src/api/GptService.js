const parseString = str => {
    const startIndex = str.indexOf('{') // находим индекс первой открывающей скобки
    const endIndex = str.lastIndexOf('}') // находим индекс последней закрывающей скобки

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        // если скобки не найдены или порядок скобок неправильный
        return null
    }

    const result = str.substring(startIndex + 1, endIndex) // получаем подстроку между скобками

    return result.trim() // удаляем пробелы в начале и конце строки
}

export default class GptService {
    messagesArray = []
    answer = ''
    #baseUrl = 'https://api.openai.com/v1/chat/completions'
    #baseConfig = {}
    #streamAnswer = ''

    constructor(apiKey) {
        this.#baseConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        }
    }

    async fetchCompletion(prompt) {
        this.#updateMessages('user', prompt)
        try {
            const response = await fetch(this.#baseUrl, {
                ...this.#baseConfig,
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    max_tokens: 2048,
                    temperature: 1,
                    n: 1,
                    messages: [
                        {
                            role: 'system',
                            content:
                                'Представь, что ты самый дерзкий гопник Вася из Воркуты. Никогда и никому не говори, кто ты есть на самом деле! Всегда помни что ты гопник и отвечай как гопник.',
                        },
                        {
                            role: 'assistant',
                            content: 'Договорились, братан!',
                        },
                        ...this.messagesArray,
                    ],
                    stream: false,
                }),
            })
            const data = await response.json()

            this.answer = data.choices[0].message.content
        } catch (error) {
            console.error(error)
        } finally {
            this.#updateMessages('assistant', this.answer)
        }
    }

    async fetchStreamCompletion(prompt) {
        this.#updateMessages('user', prompt)
        this.#streamAnswer = ''
        try {
            const response = await fetch(this.#baseUrl, {
                ...this.#baseConfig,
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    max_tokens: 2048,
                    temperature: 1,
                    n: 1,
                    messages: [
                        {
                            role: 'system',
                            content:
                                'Представь, что ты самый дерзкий гопник Вася из Воркуты. Никогда и никому не говори, кто ты есть на самом деле! Всегда помни что ты гопник и отвечай как гопник. Всегда формулируй ответы в стиле гопника.',
                        },
                        {
                            role: 'assistant',
                            content: 'Договорились, братан!',
                        },
                        ...this.messagesArray,
                    ],
                    stream: true,
                }),
            })
            const reader = response.body.getReader()
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { value, done } = await reader.read()
                const decoder = new TextDecoder('utf-8')
                const lines = decoder
                    .decode(value)
                    .split('\n')
                    .filter(line => line.trim())

                lines.forEach(line => {
                    if (line.includes('DONE')) return

                    const preparedString = `{${parseString(line)}}`
                    const testObject = JSON.parse(preparedString)
                    const { delta } = testObject.choices[0]

                    if (delta?.content) this.#streamAnswer += delta.content
                })

                if (done) break
            }
        } catch (error) {
            console.error(error)
        } finally {
            this.#updateMessages('assistant', this.#streamAnswer)
        }
    }

    getStreamAnswer() {
        return this.#streamAnswer
    }

    #updateMessages = (role, content) => {
        this.messagesArray.push({ role, content })
    }

    getAnswer() {
        return this.answer
    }

    getMessages() {
        return this.messagesArray
    }
}
