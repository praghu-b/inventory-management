import React from 'react'
import { MdShoppingCart, MdRemoveShoppingCart, MdCategory } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";


const icons = {
    'Total Products': MdShoppingCart,
    'Total Store Value': RiExchangeDollarLine,
    'Out of Stock': MdRemoveShoppingCart,
    'No of Category': MdCategory,
}

export const Widget = ({ title, value }) => {
    const Icon = icons[title] ?? MdShoppingCart

    return (
        <div className='flex w-full bg-[#243325] p-4 gap-2  rounded-lg'>
            <Icon size={24} />
            <div className=''>
                <p className='text-sm'>{title}</p>
                <p className='text-3xl'>{value}</p>
            </div>
        </div>
    )
}
