import React from 'react'
import { Widget } from './Widget'

export const Widgets = ({ metrics }) => {
  return (
    <div className='flex justify-between gap-4'>
        <Widget title='Total Products' value={metrics.totalProducts} />
        <Widget title='Total Store Value' value={metrics.totalStoreValue} />
        <Widget title='Out of Stock' value={metrics.outOfStock} />
        <Widget title='No of Category' value={metrics.noOfCategory} />
    </div>
  )
}
