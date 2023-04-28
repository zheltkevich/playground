<script setup>
import { computed, ref } from 'vue'
import { marked } from 'marked'

const convertToMarkdown = input => {
    const markdown = marked(input)
    return markdown
}
let resp = ref('')
const chatContext = ref('')
const getCompletion = async prompt => {
    try {
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${
                        import.meta.env.VITE_OPENAI_API_KEY
                    }`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-0301',
                    messages: [{ content: prompt, role: 'assistant' }],
                    max_tokens: 2048,
                    temperature: 1,
                    n: 1,
                    stream: false,
                }),
            }
        )

        const data = await response.json()
        const answer = data.choices[0].message.content

        resp.value = convertToMarkdown(answer)
        chatContext.value += '\n' + answer
    } catch (error) {
        console.error(error)
    }
}

const message = ref('')
const request = computed(() => {
    return chatContext.value + '\n' + message.value
})
</script>

<template>
    <div class="about-view">
        <h1 class="about-view__title">AboutView</h1>
        <p>Message is: {{ message }}</p>
        <form @submit.prevent="getCompletion(request)">
            <label for="message">Type your request:</label>
            <input
                id="message"
                v-model="message"
                type="text"
                placeholder="edit me"
                required />
            <button type="submit">Submit</button>
        </form>

        <p v-html="resp"></p>
    </div>
</template>

<style lang="scss">
.about-view {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding: 16px;

    @media (min-width: 768px) {
        padding: 24px;
    }
}
</style>
