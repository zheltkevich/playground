// 50 лет
const daysToSave = 3600 * 24 * 365 * 50
const prefName = 'preference'

export default class Cookie {
    /**
     * @param name {string|number}
     * @param value {*}
     */
    set(name, value) {
        const all = this._getAll()

        all[name] = value
        this._save(all)
    }

    /**
     * @param pref {object}
     * @private
     */
    _save(pref = {}) {
        const options = {
            'path': '/',
            'max-age': daysToSave,
        }
        let updatedCookie = `${prefName}=${JSON.stringify(pref)}`

        for (const optionKey in options) {
            if (Object.hasOwnProperty.call(options, optionKey)) {
                updatedCookie += `; ${optionKey}`
                const optionValue = options[optionKey]

                updatedCookie += `=${optionValue}`
            }
        }

        document.cookie = updatedCookie
    }

    /**
     * @param key {string}
     * @returns {*}
     */
    get(key) {
        const all = this._getAll()

        return all[key]
    }

    /**
     * @return {object}
     */
    _getAll() {
        const cookies = document.cookie ? document.cookie.split('; ') : []
        let all = {}

        for (let i = 0; i < cookies.length; i++) {
            const parts = cookies[i].split('=')
            const value = parts[1]

            if (parts[0] === prefName) {
                all = JSON.parse(value)
            }
        }

        return all
    }

    /**
     * @param name {string|number}
     */
    delete(name) {
        const all = this._getAll()

        if (name in all) {
            delete all[name]
        }

        this._save(all)
    }
}
