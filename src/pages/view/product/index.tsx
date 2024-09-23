import { ProductType } from '@/types/ProductType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const ProductViewPage = ({data}: {data: ProductType[]}) => {
  return (
    <div className='w-[100%] '>
        <h1 className='text-center text-[32px] font-bold'>Product Page</h1>
        <div className='flex mx-[45px] '>
            {data.length > 0 ? (
              <>
                {data.map((product: ProductType) => (
                <Link href={`/product/${product.id}`} className='w-[20%] m-3' key={product.id}>
                  <div><Image src={product.image} width={500} height={500} alt={product.name} /></div>
                  <h4 className='text-[18px] font-bold '>{product.name}</h4>
                  <p className='text-slate-600 font-medium'>{product.categories}</p>
                  <p className='font-semibold text-[15px] mt-2'>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR',  })}</p>
                </Link>
            ))}
              </>
            ): (
                <div className='w-[20%] m-3'>
                  <div className='w-[100%] aspect-square animate-pulse bg-gray-300'></div>
                  <div className='w-[100%] h-[20px] animate-pulse mt-[5px] bg-gray-300'/>
                  <div className='w-[100%] h-[16px] animate-pulse bg-gray-300'/>
                  <div className='w-[100%] h-[16px] animate-pulse mt-[10px] bg-gray-300' />
                </div>
            )}
                
            
        </div>
    </div>
  )
}

export default ProductViewPage
