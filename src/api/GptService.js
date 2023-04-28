export default class GptService {
    messagesArray = []
    answer = ''

    constructor(
        apiKey,
        { streamMode = false, maxTokens = 2048, temperature = 1, n = 1 }
    ) {
        this.apiKey = apiKey
        this.streamMode = streamMode
        this.maxTokens = maxTokens
        this.temperature = temperature
        this.n = n
    }

    async fetchCompletion(prompt) {
        this.#updateMessages('user', prompt)
        try {
            const response = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
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
                        max_tokens: this.maxTokens,
                        temperature: this.temperature,
                        n: this.n,
                        stream: this.streamMode,
                    }),
                }
            )
            const data = await response.json()

            this.answer = data.choices[0].message.content
        } catch (error) {
            console.error(error)
        } finally {
            this.#updateMessages('assistant', this.answer)
        }
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
