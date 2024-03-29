<script setup>
import { ref, computed } from 'vue'
import AppLoader from '@ui/AppLoader.vue'
const props = defineProps({
    type: {
        type: String,
        default: () => 'button',
    },
    disabled: {
        type: Boolean,
        default: () => false,
    },
    selected: {
        type: Boolean,
        default: () => false,
    },
    loading: {
        type: Boolean,
        default: () => false,
    },
    styles: {
        type: Object,
        default: () => ({}),
    },
})
const emit = defineEmits(['click'])
const active = ref(false)

const isDisabled = computed(() => {
    return props.disabled || props.loading
})

const classes = computed(() => {
    return {
        disabled: isDisabled.value,
        selected: props.selected,
        loading: props.loading,
        active: active.value,
    }
})

const listeners = computed(() => {
    return {
        mousedown: () => (active.value = true),
        mouseup: () => (active.value = false),
        mouseleave: () => (active.value = false),
        touchstart: () => (active.value = true),
        touchend: () => (active.value = false),
        click: () => emit('click'),
    }
})
</script>

<template>
    <button
        class="app-button"
        :class="classes"
        :type="type"
        :disabled="isDisabled"
        v-on="listeners">
        <span class="app-button__loader-container">
            <AppLoader
                class="app-button__loader"
                size="100%"
                type="small">
            </AppLoader>
        </span>
        <span class="app-button__slot">
            <slot />
        </span>
    </button>
</template>

<style lang="scss">
.app-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: unset;
    border: unset;
    user-select: none;
    transition-timing-function: ease-out;
    transition-duration: 0.1s;
    transition-property: color, background-color, opacity, border-color;

    &.active {
        opacity: 0.6;
    }

    &.disabled,
    &[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &__loader-container {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        width: 16px;
        height: 16px;
        opacity: 0;
        pointer-events: none;
        transform: translateX(-50%) translateY(-50%);

        .app-button.loading & {
            opacity: 1;
        }
    }

    &__slot {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;

        .app-button.loading & {
            opacity: 0;
        }
    }
}
</style>
