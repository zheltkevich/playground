<script setup>
import { ref, computed } from 'vue'
defineProps({
    placeholder: {
        type: String,
        default: 'text',
    },
})

const emit = defineEmits(['input'])
const inputValue = ref('')
const focus = ref(false)
const classes = computed(() => {
    return {
        focus: focus.value,
        empty: !inputValue.value,
    }
})
const textareaListeners = computed(() => {
    return {
        focus: () => (focus.value = true),
        blur: () => (focus.value = false),
        input: () => emit('input', inputValue.value),
    }
})

const inputField = ref(null)
const inputClick = () => {
    inputField.value.focus()
}
</script>

<template>
    <div
        class="app-textarea"
        :class="classes"
        @click="inputClick">
        <span v-if="$slots.prepend">
            <slot name="prepend" />
        </span>
        <textarea
            ref="inputField"
            v-model="inputValue"
            class="app-textarea__field"
            :type="type"
            :placeholder="placeholder"
            v-on="textareaListeners" />
        <span v-if="$slots.append">
            <slot name="append" />
        </span>
    </div>
</template>

<style lang="scss">
.app-textarea {
    display: flex;
    padding: 8px;
    border: 1px solid var(--gray);
    border-radius: 8px;
    background-color: var(--white);
    cursor: text;
    transition: 0.1s ease-out;
    transition-property: color, background-color, opacity, border-color;

    &.focus {
        border-color: var(--main);
    }

    &__field {
        display: flex;
        flex-grow: 1;
        border: none;
        background-color: inherit;
        outline: none;
    }
}
</style>
