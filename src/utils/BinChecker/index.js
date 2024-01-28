import banksData from '@utils/BinChecker/binData/banks.json'
import paysystemsData from '@utils/BinChecker/binData/paysystems.json'

const BANKS = banksData.banks
const PAYSYSTEMS = paysystemsData.items

export class BinChecker {
    static paySystemData = {
        id: '',
        name: '',
        validLengthArray: [],
        minLength: 16,
        maxLength: 19,
    }
    static bankData = {
        id: '',
        name: '',
        brandColor: '',
    }
    static getBankData(cardNumber) {
        const firstDigits = cardNumber.replace(/\D/g, '').slice(0, 6)
        const bankData = {
            id: '',
            name: '',
            brandColor: '',
        }

        for (const bank of BANKS) {
            for (const bin of bank.bins) {
                if (firstDigits.includes(bin)) {
                    bankData.id = bank.id
                    bankData.name = bank.name
                    bankData.brandColor = bank.brandColor

                    break
                }
            }
        }

        return bankData
    }

    static getPaySystemData(cardNumber) {
        const number = cardNumber.replace(/\D/g, '')
        const paySystem = PAYSYSTEMS.find(paySystem =>
            number.match(paySystem.pattern)
        )

        return {
            id: paySystem ? paySystem.id : '',
            name: paySystem ? paySystem.name : '',
            validLengthArray: paySystem ? paySystem.validLengthArray : [16],
            minLength: paySystem ? paySystem.validLengthArray[0] : 16,
            maxLength: paySystem
                ? paySystem.validLengthArray[
                      paySystem.validLengthArray.length - 1
                  ]
                : 19,
        }
    }
}
