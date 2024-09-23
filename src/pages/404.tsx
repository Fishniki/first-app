import Image from 'next/image'
import React from 'react'

const ErrorCustomPage = () => {
  return (
    <div className='flex flex-col w-[100vw] h-[100vh] justify-center items-center '>
      <Image src="/error-404.jpg" width={300} height={300} alt="" />
      <div>404 | Halaman tidak ditemukan</div>
    </div>
  )
}

export default ErrorCustomPage
