import { ProductType } from "@/types/ProductType"
import ProductViewPage from "../view/product"
    

const ProductPage = (props: {product: ProductType[]}) => {
    const {product} = props
    return (
        <div>
            <ProductViewPage data={product} />
        </div>
    )
}

export default ProductPage

//dipanggil setiap melakukan request
export async function getServerSideProps () {
    //fetc data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`)
    const respons = await res.json()

    return {
        props: {
            product: respons.data
        }
    }
}