import Cookie from '@utils/PreferenceKeeper/Transport/Cookie.js'
import LocalStorage from '@utils/PreferenceKeeper/Transport/LocalStorage.js'

class PreferenceKeeper {
    constructor(Transport) {
        this.setTransport(new Transport())
    }

    /**
     * @param transport {Object} must implement interface
     */
    setTransport(transport) {
        this.transport = transport
    }

    /**
     * @param name {String|Number}
     * @param value {*}
     */
    setItem(name, value) {
        this.transport.set(name, value)
    }

    /**
     * @param name {String|Number}
     * @param def {*} default value
     * @returns {*}
     */
    getItem(name, def) {
        const pref = this.transport.get(name)

        return typeof pref !== 'undefined' ? pref : def
    }

    /**
     * @param name {String|Number}
     */
    deleteItem(name) {
        this.transport.delete(name)
    }
}

export default new PreferenceKeeper(Cookie)
export const PreferenceKeeperLS = new PreferenceKeeper(LocalStorage)
