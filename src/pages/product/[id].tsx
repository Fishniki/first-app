import { ProductType } from '@/types/ProductType'
import { useRouter } from 'next/router'
import React from 'react'
import DetailProduct from '../view/detail-product/detail-product'

const UserProduct = ({product}: {product: ProductType}) => {

    const router = useRouter()
    const {query} = router
    // const {data, error, isLoading} = useSWR(`/api/product/${query.id}`, fetcher)

  return (
    <div>
        <div className='text-center text-xl font-bold'>Detail Product</div>

        {/* client-side */}
        {/* <DetailProduct product={isLoading ? [] : data.data}/> */}

        {/* server side */}
        <DetailProduct product={product} />
    </div>

  )
}

export default UserProduct

export async function getServerSideProps({params}: {params: {id: string}}) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`)
  const respons = await res.json()


  return {
    props: {
      product: respons.data
    }
  }
}


  //static side generation
  // export async function getStaticPaths() {
  //   const res = await fetch("http://localhost:3000/api/product")
  //   const respons =  await res.json()

  //   const paths = respons.data.map((product: ProductType) => ({
  //     params: {
  //       id: product.id
  //     }
  //   }))

  //   return {paths, fallback: false}
  // }


  //static side generation
// export async function getStaticProps({params}: {params: {id: string}}) {
//   //fetch data
//   const res = await fetch(`http://localhost:3000/api/product/${params.id}`)
//   const respons = await res.json()
//   return {
//     props: {
//       product: respons.data
//     }
//   } 
// }