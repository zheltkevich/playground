export default class GptService {
    messagesArray = []
    answer = ''
    #baseUrl = 'https://api.openai.com/v1/chat/completions'
    #baseConfig = {}

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

    // async fetchStreamCompletion(prompt) {
    //     try {

    //     }
    // }

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
