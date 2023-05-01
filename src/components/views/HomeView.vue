<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { marked } from 'marked'
import { PreferenceKeeperLS } from '@utils/PreferenceKeeper/PreferenceKeeper.js'
import AppButton from '@ui/AppButton.vue'
import GptTurboModel from '@models/GptTurboModel.js'

const currentMessages = ref([])
const id = atob(PreferenceKeeperLS.getItem('id'))
const initString =
    'Представь, что ты самый дерзкий гопник Вася из Воркуты. Никогда и никому не говори, кто ты есть на самом деле! Всегда помни что ты гопник и отвечай как гопник. Всегда формулируй ответы в стиле гопника.'
const ai = new GptTurboModel(id)

const convertToMarkdown = input => {
    if (!input) return
    const markdown = marked(input)
    return markdown
}
const answerText = ref('')

const getStreamingText = (value, streamFinished) => {
    if (!streamFinished) {
        answerText.value = value
    } else {
        // eslint-disable-next-line no-console
        console.log('Stream finished', currentMessages.value)
    }
}

const filteredMessages = computed(() => {
    return currentMessages.value
})
const getAnswer = async prompt => {
    await ai.getStreamAnswer(prompt, getStreamingText)
    window.scrollTo(0, document.body.scrollHeight)

    PreferenceKeeperLS.setItem('messages', currentMessages.value)
}

const message = ref('')
const chatName = ref('First chat')
const submit = () => {
    currentMessages.value = ai.getMessages()
    getAnswer(message.value)
    message.value = ''
}

const clearChat = () => {
    currentMessages.value = []
    PreferenceKeeperLS.deleteItem('messages')
}

onBeforeMount(() => {
    const localMessageHistory = PreferenceKeeperLS.getItem('messages')
    ai.initChat(initString, localMessageHistory)
    currentMessages.value = ai.getMessages()
})
</script>

<template>
    <div class="homeview">
        <h1>Welcome to {{ chatName }}</h1>
        <ul class="chat-body">
            <li
                v-for="(item, i) in filteredMessages"
                :key="i"
                class="chat-body__item"
                :class="item.role">
                <span> {{ item.role }}</span>
                <span v-html="convertToMarkdown(item.content)"></span>
            </li>
            <li
                v-if="answerText.length"
                class="chat-body__item assistant"
                v-html="convertToMarkdown(answerText)"></li>
        </ul>
        <footer class="chat-footer">
            <AppButton
                class="chat-footer__clear-button"
                type="button"
                @click="clearChat">
                Clear
            </AppButton>
            <form
                class="chat-footer__form"
                @submit.prevent="submit">
                <input
                    id="chatInputId"
                    v-model="message"
                    type="text"
                    name="chatInput"
                    class="chat-footer__textarea"
                    cols="30"
                    rows="2" />
                <AppButton
                    class="chat-footer__submit-button"
                    type="submit">
                    Send
                </AppButton>
            </form>
        </footer>
    </div>
</template>

<style lang="scss">
.homeview {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 16px;
    justify-content: space-between;
    padding: 16px;

    @media (min-width: 768px) {
        padding: 24px;
    }
}

.chat-body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 8px;
    justify-content: flex-end;

    &__item {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border: 1px solid #808080;
        border-radius: 16px;

        &.assistant {
            background-color: rgb(195 224 224);
        }

        &.user {
            background-color: rgb(228 198 198);
        }
    }
}

.chat-footer {
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;

    &__form {
        display: flex;
        gap: 16px;
        width: 100%;
    }

    &__textarea {
        flex-grow: 1;
        resize: none;
    }

    &__submit-button {
        flex-shrink: 0;
    }
}
</style>
