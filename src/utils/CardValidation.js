import date from '@js/helpers/date.js'

export class CardValidation {
    static checkNumberLength(cardNumber) {
        const number = cardNumber.replace(/\D/g, '')
        const { validLengthArray } = this.getPaySystemData(number)

        for (const validLength of validLengthArray) {
            if (number.length === validLength) {
                return true
            }
        }

        return false
    }
    static checkNumberLuna(cardNumber, minLength = 16, maxLength = 19) {
        const number = cardNumber.replace(/\D/g, '')
        const testRange =
            number.length >= minLength && number.length <= maxLength

        if (testRange) {
            let sum = 0

            for (let i = number.length - 1; i >= 0; i--) {
                let digit = parseInt(number.charAt(i))
                if (i % 2 == number.length % 2) {
                    digit *= 2
                    if (digit > 9) {
                        digit -= 9
                    }
                }
                sum += digit
            }
            return sum % 10 === 0 && sum !== 0
        } else {
            return true
        }
    }

    static checkNumber(fullNumber, cardId) {
        const errors = []
        let valid = true

        if (cardId.length) {
            return [valid, errors]
        }

        const { minLength, maxLength } = this.getPaySystemData(fullNumber)
        const invalidLength = !this.checkNumberLength(fullNumber)
        const invalidLuna = !this.checkNumberLuna(
            fullNumber,
            minLength,
            maxLength
        )

        if (invalidLength) errors.push('numberLength')
        if (invalidLuna) errors.push('numberLuna')

        valid = errors.length === 0

        return [valid, errors]
    }

    static checkDate(month, year, paySystemId) {
        const currentYear = date.shortYear
        const currentMonth = date.month
        const inputMonth = Number(month)
        const inputYear = Number(year)

        const checkStandartValidationAllowed = (month, year, paySystemId) => {
            const validatedPaysystems =
                paySystemId === 'mir' || paySystemId === ''
            const outOfExceptionDateRange =
                (year === 22 && month < 3) || year < 22

            return validatedPaysystems || outOfExceptionDateRange
        }

        const errors = []
        const validLenght = month.length === 2 && year.length === 2
        const standartValidationAllowed = checkStandartValidationAllowed(
            inputMonth,
            inputYear,
            paySystemId
        )
        const validMonth = inputMonth >= 1 && inputMonth <= 12

        if (validLenght && validMonth) {
            if (standartValidationAllowed) {
                if (inputYear < currentYear) errors.push('expired')
                if (inputYear === currentYear && inputMonth < currentMonth)
                    errors.push('expired')
            }
        } else {
            errors.push('invalidDate')
        }

        const valid = errors.length === 0
        return [valid, errors]
    }

    static checkCvc(cvc) {
        const errors = []
        let valid = true

        if (cvc.length !== 3) {
            errors.push('cvcLength')
        } else {
            errors.length = 0
        }

        if (errors.length > 0) valid = false
        else valid = true

        return [valid, errors]
    }
}
