class Store {
    constructor() {
        this.store = new Map()
    }
    ping() {
        return 'PONG'
    }
    set(key, value) {
        if (key === "") {
            return 'Key cannot be empty'
        }
        this.store.set(key, value)
        return 'OK'
    }
    get(key) {
        if (key === "") {
            return 'Key cannot be empty'
        }
        return this.store.get(key) ?? null
    }
    exists(key) {
        if (key === "") {
            return 'Key cannot be empty'
        }
        return this.store.has(key)
    }
    delete(key) {
        if (key === "") {
            return 'Key cannot be empty'
        }
        return this.store.delete(key)? 'Deleted' : 'Key does not exist'
    }
}

export default Store