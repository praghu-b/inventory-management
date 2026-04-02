import seedRows from '../mock/mockData.json'

const STORAGE_KEY = 'inventory_data_v1'
const API_DELAY_MS = 600

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const toSeedRows = () => seedRows.map((row) => ({ ...row, isDisabled: false }))

const readRows = () => {
    if (typeof window === 'undefined') {
        return toSeedRows()
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (!storedValue) {
        const seededRows = toSeedRows()
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededRows))
        return seededRows
    }

    try {
        const parsed = JSON.parse(storedValue)
        return Array.isArray(parsed) ? parsed : toSeedRows()
    } catch {
        const seededRows = toSeedRows()
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededRows))
        return seededRows
    }
}

const writeRows = (rows) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
    }
}

export const fetchInventory = async () => {
    await delay(API_DELAY_MS)
    return readRows()
}

export const updateInventoryProduct = async (updatedProduct) => {
    await delay(API_DELAY_MS)

    const updatedRows = readRows().map((row) => (
        row.id === updatedProduct.id ? { ...row, ...updatedProduct } : row
    ))

    writeRows(updatedRows)
    return updatedRows
}

export const deleteInventoryProduct = async (id) => {
    await delay(API_DELAY_MS)

    const updatedRows = readRows().filter((row) => row.id !== id)
    writeRows(updatedRows)
    return updatedRows
}

export const toggleInventoryProductDisabled = async (id) => {
    await delay(API_DELAY_MS)

    const updatedRows = readRows().map((row) => (
        row.id === id ? { ...row, isDisabled: !row.isDisabled } : row
    ))

    writeRows(updatedRows)
    return updatedRows
}