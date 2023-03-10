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
    <span
        :style="[`--loader-size: ${size};`]"
        class="app-loader-box">
        <span
            class="app-loader"
            :class="[props.type]"></span>
    </span>
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

.app-loader-box {
    position: absolute;
    display: flex;
    width: var(--loader-size);
    height: var(--loader-size);
}

.app-loader {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;

    &.big {
        border: 3px solid transparent;

        // border-top-color: var(--main);
        // border-bottom-color: var(--main);
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
            border-top-color: var(--main);
            border-bottom-color: var(--main);
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
            border-top-color: var(--main);
            border-bottom-color: var(--main);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    }

    &.small {
        width: var(--loader-size);
        height: var(--loader-size);
        border: 2px dashed var(--main);
        border-radius: 50%;
        animation: spin 1.7s linear infinite;
    }
}
</style>
