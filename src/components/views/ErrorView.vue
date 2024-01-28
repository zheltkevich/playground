<script setup>
import { ref, reactive } from 'vue'
// import { BinChecker } from '@utils/BinChecker/BinChecker.js'
import { CardModel } from '@js/models/CardModel.js'

const card = reactive(new CardModel())
const date = ref('')
const cvv = ref('')
// const paysystem = computed(() => {
//     const { name } = BinChecker.getPaySystemData(cardNumber.value)
//     return name
// })
// const bank = computed(() => {
//     const { name } = BinChecker.getBankData(cardNumber.value)
//     return name
// })
</script>

<template>
    <div class="error-view">
        <h1>ErrorView</h1>
        <form>
            <label for="cardNumber">cardNumber</label>
            <input
                id="cardNumber"
                v-model="card.number"
                type="text" />
            <label for="date">date</label>
            <input
                id="date"
                v-model="date"
                type="text" />
            <label for="cvv">cvv</label>
            <input
                id="cvv"
                v-model="cvv"
                type="text" />
        </form>
        <h2>{{ card.number }}</h2>

        <h2>PAYSYSTEM: {{ card.getPaysystem() }}</h2>
        <h2>BANK: {{ card.getBank() }}</h2>
    </div>
</template>

<style lang="scss">
.error-view {
    padding: 16px;

    @media (min-width: 768px) {
        padding: 24px;
    }

    form {
        display: flex;
        flex-direction: column;
    }
}
</style>
