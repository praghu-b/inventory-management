import {
    deleteInventoryProduct,
    toggleInventoryProductDisabled,
    updateInventoryProduct,
} from '../services/inventoryApi'

export const useInventoryHandlers = ({
    role,
    selectedProduct,
    setInventory,
    setIsOpen,
    setSelectedProduct,
    setIsSaving,
    setPendingRowId,
}) => {
    const handleDelete = async (id) => {
        setPendingRowId(id)

        try {
            const updatedRows = await deleteInventoryProduct(id)
            setInventory(updatedRows)

            if (selectedProduct?.id === id) {
                setSelectedProduct(null)
                setIsOpen(false)
            }
        } finally {
            setPendingRowId(null)
        }
    }

    const handleToggleDisable = async (id) => {
        setPendingRowId(id)

        try {
            const updatedRows = await toggleInventoryProductDisabled(id)
            setInventory(updatedRows)

            if (selectedProduct?.id === id) {
                setSelectedProduct(null)
                setIsOpen(false)
            }
        } finally {
            setPendingRowId(null)
        }
    }

    const handleEdit = (row) => {
        if (row.isDisabled || role !== 'admin') {
            return
        }

        setSelectedProduct(row)
        setIsOpen(true)
    }

    const handleSave = async (updatedProduct) => {
        setIsSaving(true)

        try {
            const updatedRows = await updateInventoryProduct(updatedProduct)
            setInventory(updatedRows)
            setSelectedProduct(updatedRows.find((row) => row.id === updatedProduct.id) ?? null)
            setIsOpen(false)
            return true
        } finally {
            setIsSaving(false)
        }
    }

    return {
        handleDelete,
        handleToggleDisable,
        handleEdit,
        handleSave,
    }
}
