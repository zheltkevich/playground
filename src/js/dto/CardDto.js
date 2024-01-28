export class CardDto {
    constructor(card = {}) {
        this.cvc = card.cvc ?? ''
        this.cardId = card.cardId ?? ''
        this.fullNumber = card.fullNumber ?? ''
        this.expiredMonth = card.expiredMonth ?? ''
        this.expiredYear = card.expiredYear ?? ''
    }
}
