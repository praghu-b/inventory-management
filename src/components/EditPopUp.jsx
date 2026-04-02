import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

export const EditPopUp = ({ setIsOpen, product, onSave, isSaving }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                price: String(product.price),
                quantity: String(product.quantity),
            })
        }
    }, [product])

    const totalValue = Number(formData.price || 0) * Number(formData.quantity || 0)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((current) => ({
            ...current,
            [name]: value,
        }))
    }

    const handleSave = async () => {
        if (!product) {
            return
        }

        const saveSucceeded = await onSave({
            ...product,
            category: formData.category,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
        })

        if (saveSucceeded) {
            setIsOpen(false)
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
            <div className='w-1/3 bg-[#292B27]  p-6 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <p className='text-2xl'>Edit Product</p>
                    <button type='button' disabled={isSaving} className='bg-black/30 p-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => setIsOpen(false)}><IoClose size={24} color='#9DAD52' /></button>
                </div>
                <p className='text-sm font-light'>{formData.name}</p>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                    <div>
                        <p className='text-xs mb-4'>Category</p>
                        <input disabled={isSaving} name='category' value={formData.category} onChange={handleChange} type='text' className='w-full bg-[#3a3c37]  p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed' />
                    </div>
                    <div>
                        <p className='text-xs mb-4'>Price</p>
                        <input disabled={isSaving} name='price' value={formData.price} onChange={handleChange} type='number' className='w-full bg-[#3a3c37]  p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:cursor-not-allowed' />
                    </div>
                    <div>
                        <p className='text-xs mb-4'>Quantity</p>
                        <input disabled={isSaving} name='quantity' value={formData.quantity} onChange={handleChange} type='number' className='w-full bg-[#3a3c37]  p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:cursor-not-allowed' />
                    </div>
                    <div>
                        <p className='text-xs mb-4'>Total Value</p>
                        <input value={totalValue} readOnly type='number' className='w-full bg-[#3a3c37]  p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                    </div>
                </div>
                <div className='flex gap-3 mt-6 justify-end'>
                    <button disabled={isSaving} className='px-4 py-2 text-sm text-[#9DAD52] rounded disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => setIsOpen(false)}>Cancel</button>
                    <button disabled={isSaving} className='px-4 py-2 text-sm bg-[#3a3c37] hover:bg-blue-700 rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed' onClick={handleSave}>{isSaving ? 'Saving...' : 'Save'}</button>
                </div>
            </div>
        </div>
    )
}
