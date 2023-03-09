const prefName = 'preference'

export default class LocalStorage {
    /**
     * @param key {string|number}
     * @param value {*}
     */
    set(key, value) {
        const all = this.getAll()

        all[key] = value
        this.save(all)
    }

    /**
     * @param pref {object}
     * @private
     */
    save(pref = {}) {
        localStorage.setItem(prefName, JSON.stringify(pref))
    }

    /**
     * @param key {string}
     * @returns {*}
     */
    get(key) {
        const all = this.getAll()

        return all[key]
    }

    /**
     * @return {object}
     */
    getAll() {
        const storageData = localStorage.getItem(prefName)
        const storage = storageData ? storageData.split('; ') : []
        let all = {}

        for (let i = 0; i < storage.length; i++) {
            all = JSON.parse(storage[i])
        }

        return all
    }

    /**
     * @param key {string|number}
     */
    delete(key) {
        const all = this.getAll()

        if (key in all) {
            delete all[key]
        }

        this.save(all)
    }
}
