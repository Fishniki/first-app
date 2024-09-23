import { ProductType } from '@/types/ProductType'
import React from 'react'


const DetailProduct = ({product}: {product: ProductType}) => {
  return (
    <div>
        <div className='w-[20%] m-3 mx-auto' key={product.id}>
            <div><img src={product.image} alt={product.name} /></div>
            <h4 className='text-[18px] font-bold '>{product.name}</h4>
            <p className='text-slate-600 font-medium'>{product.categories}</p>
            <p className='font-semibold text-[15px] mt-2'>{product.price && product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR',  })}</p>
        </div>
    </div>
  )
}

export default DetailProduct
