<script setup>
import { ref } from 'vue'
import { marked } from 'marked'
import GptService from '@api/GptService.js'
const ai = new GptService(import.meta.env.VITE_OPENAI_API_KEY, {})

const convertToMarkdown = input => {
    const markdown = marked(input)
    return markdown
}
const resp = ref('')
const printer = ref('')
const printWithDelay = () => {
    const delay = 30
    let i = 0

    function printNext() {
        if (i < resp.value.length) {
            printer.value += resp.value.charAt(i)
            i++
            setTimeout(printNext, delay)
        }
    }

    printNext()
}

const getCompletion = async prompt => {
    await ai.fetchStreamCompletion(prompt)
    const answer = ai.getStreamAnswer()
    resp.value = convertToMarkdown(answer)
    printWithDelay()
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

        <div v-html="printer"></div>
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
