<script setup>
const props = defineProps({
    size: {
        type: String,
        default: '60px',
    },
    type: {
        type: String,
        default: 'big',
        validator(value) {
            return ['big', 'small'].includes(value)
        },
    },
})
</script>

<template>
    <div
        class="app-loader"
        :style="[`--loader-size: ${size};`]"
        :class="[props.type]"></div>
</template>

<style lang="scss">
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes spin-reverse {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(-360deg);
    }
}

.app-loader.big {
    position: relative;
    z-index: 11;
    display: block;
    width: var(--loader-size);
    height: var(--loader-size);
    border: 3px solid transparent;
    border-top-color: #16a085;
    border-radius: 50%;
    animation: spin 1.7s linear infinite;

    &::before {
        content: '';
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border: 3px solid transparent;
        border-top-color: #e74c3c;
        border-radius: 50%;
        animation: spin-reverse 0.6s linear infinite;
    }

    &::after {
        content: '';
        position: absolute;
        top: 15px;
        right: 15px;
        bottom: 15px;
        left: 15px;
        border: 3px solid transparent;
        border-top-color: #f9c922;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}

.app-loader.small {
    width: var(--loader-size);
    height: var(--loader-size);
    border: 2px dashed var(--main);
    border-radius: 50%;
    animation: spin 1.7s linear infinite;
}
</style>
