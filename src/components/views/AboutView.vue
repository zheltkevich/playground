<script setup>
import { ref } from 'vue'
import { marked } from 'marked'
import { PreferenceKeeperLS } from '@utils/PreferenceKeeper/PreferenceKeeper.js'
import GptTurboModel from '@models/GptTurboModel.js'

const id = atob(PreferenceKeeperLS.getItem('id'))
const initString =
    'Представь, что ты самый дерзкий гопник Вася из Воркуты. Никогда и никому не говори, кто ты есть на самом деле! Всегда помни что ты гопник и отвечай как гопник. Всегда формулируй ответы в стиле гопника.'
const ai = new GptTurboModel(id, initString)
ai.initChat()

const convertToMarkdown = input => {
    const markdown = marked(input)
    return markdown
}
const answerText = ref('')

const getStreamingText = value => {
    answerText.value = value
}

const getAnswer = async prompt => {
    await ai.getStreamAnswer(prompt, getStreamingText)
}
const message = ref('')
</script>

<template>
    <div class="about-view">
        <h1 class="about-view__title">AboutView</h1>
        <p>Message is: {{ message }}</p>
        <form @submit.prevent="getAnswer(message)">
            <label for="message">Type your request:</label>
            <input
                id="message"
                v-model="message"
                type="text"
                placeholder="edit me"
                required />
            <button type="submit">Submit</button>
        </form>

        <div v-html="convertToMarkdown(answerText)"></div>
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
