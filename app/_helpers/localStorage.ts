
class LocalStorage {
    static set(storageName: string, value: any) {
        localStorage.setItem(storageName, JSON.stringify(value))
    }

    static get(storageName: string) {
        const storedData = localStorage.getItem(storageName)
        if (storedData) {
            return JSON.parse(storedData)
        }
        else return null
    }

    static clear() {
        localStorage.clear()
    }
}

export { LocalStorage }