import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { InventoryTable } from '../components/InventoryTable'
import { Widgets } from '../components/Widgets'
import { EditPopUp } from '../components/EditPopUp'
import { useRole } from '../context/RoleContext'
import { useInventoryHandlers } from '../hooks/useInventoryHandlers'
import {
    fetchInventory,
} from '../services/inventoryApi'

export const Dashboard = () => {
    const { role } = useRole()
    const [inventory, setInventory] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const [pendingRowId, setPendingRowId] = useState(null)
    const [isLoadingInventory, setIsLoadingInventory] = useState(true)

    useEffect(() => {
        const loadInventory = async () => {
            setIsLoadingInventory(true)

            try {
                const storedInventory = await fetchInventory()
                setInventory(storedInventory)
            } finally {
                setIsLoadingInventory(false)
            }
        }

        loadInventory()
    }, [])

    const activeInventory = inventory.filter((row) => !row.isDisabled)

    const metrics = useMemo(() => {
        const totalProducts = activeInventory.length
        const totalStoreValue = activeInventory.reduce((sum, row) => sum + (row.price * row.quantity), 0)
        const outOfStock = activeInventory.filter((row) => row.quantity === 0).length
        const noOfCategory = new Set(activeInventory.map((row) => row.category)).size

        return {
            totalProducts,
            totalStoreValue,
            outOfStock,
            noOfCategory,
        }
    }, [activeInventory])

    const {
        handleDelete,
        handleToggleDisable,
        handleEdit,
        handleSave,
    } = useInventoryHandlers({
        role,
        selectedProduct,
        setInventory,
        setIsOpen,
        setSelectedProduct,
        setIsSaving,
        setPendingRowId,
    })

    return (
        <>
            <section className='bg-black min-h-screen p-6'>
                <div className="flex-col space-y-6">
                    <Navbar />
                    <h1 className=' text-3xl'>Inventory Stats</h1>
                    <Widgets metrics={metrics} />
                    <InventoryTable
                        rows={inventory}
                        role={role}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDisable={handleToggleDisable}
                        pendingRowId={pendingRowId}
                        isLoading={isLoadingInventory}
                    />
                    {isOpen && (
                        <EditPopUp
                            setIsOpen={setIsOpen}
                            product={selectedProduct}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    )}
                </div>
            </section>
        </>
    )
}
