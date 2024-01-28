import { BinChecker } from '@utils/BinChecker'

export class CardModel {
    constructor(card = {}) {
        this.number = card.number ?? ''
        this.month = card.month ?? ''
        this.year = card.year ?? ''
        this.cvc = card.cvc ?? ''

        this.maskedNumber = card.maskedNumber ?? ''
        this.cardId = card.cardId ?? ''
        this.bankId = card.bankId ?? ''
        this.paysystemId = card.paysystemId ?? ''
    }

    getPaysystem() {
        const { name } = BinChecker.getPaySystemData(this.number)

        return name
    }

    getBank() {
        const { name } = BinChecker.getBankData(this.number)

        return name
    }

    getSavedCardData() {
        return ''
    }

    getNewCardData() {
        return ''
    }

    clear() {
        this
    }
}
