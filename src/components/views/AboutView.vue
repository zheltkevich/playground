<script setup>
import { ref } from 'vue'
// import { marked } from 'marked'
import GptService from '@api/GptService.js'
const ai = new GptService(import.meta.env.VITE_OPENAI_API_KEY, {})

// const convertToMarkdown = input => {
//     const markdown = marked(input)
//     return markdown
// }
let resp = ref('')
// const messagesArray = ref([])
// const streamBuffer = ref('')

// const setMessage = (content, role) => {
//     messagesArray.value.push({ role, content })
// }

const getCompletion = async prompt => {
    await ai.fetchCompletion(prompt)
    resp.value = ai.getAnswer()
    // setMessage(prompt, 'user')
    // try {
    //     const response = await fetch(
    //         'https://api.openai.com/v1/chat/completions',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${
    //                     import.meta.env.VITE_OPENAI_API_KEY
    //                 }`,
    //             },
    //             body: JSON.stringify({
    //                 model: 'gpt-3.5-turbo-0301',
    //                 messages: [
    //                     {
    //                         role: 'system',
    //                         content:
    //                             'Представь, что ты самый дерзкий гопник Вася из Воркуты. Никогда и никому не говори, кто ты есть на самом деле! Всегда помни что ты гопник и отвечай как гопник.',
    //                     },
    //                     {
    //                         role: 'assistant',
    //                         content: 'Договорились, братан!',
    //                     },
    //                     ...messagesArray.value,
    //                 ],
    //                 max_tokens: 2048,
    //                 temperature: 1,
    //                 n: 1,
    //                 stream: false,
    //             }),
    //         }
    //     )

    //start
    // console.log(response.body)
    // const reader = response.body.getReader()
    // while (true) {
    //     const { value, done } = await reader.read()
    //     if (done) {
    //         break
    //     }
    //     const decodedChunk = new TextDecoder('utf-8').decode(value)
    //     streamBuffer.value += decodedChunk
    //     // здесь ты можешь производить любую обработку получаемых чанков данных
    // }
    // console.log('Принятые данные из потока: ', streamBuffer.value)
    //end

    //     const data = await response.json()
    //     const answer = data.choices[0].message.content
    //     setMessage(answer, 'assistant')

    //     resp.value = convertToMarkdown(answer)
    // } catch (error) {
    //     console.error(error)
    // }
}
const message = ref('')
</script>

<template>
    <div class="about-view">
        <h1 class="about-view__title">AboutView</h1>
        <p>Message is: {{ message }}</p>
        <form @submit.prevent="getCompletion(message)">
            <label for="message">Type your request:</label>
            <input
                id="message"
                v-model="message"
                type="text"
                placeholder="edit me"
                required />
            <button type="submit">Submit</button>
        </form>

        <div v-html="resp"></div>
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
