import { ProductType } from "@/types/ProductType"
import ProductViewPage from "../view/product"
import { revalidatePath, revalidateTag } from "next/cache"
    


const ProductPageStatic = (props: {product: ProductType[]}) => {
    const {product} = props
    return (
        <div>
            <ProductViewPage data={product} />
        </div>
    )
}

export default ProductPageStatic

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/product', {
        next: {
            revalidate: 10
        }
    })
    const respons = await res.json()
    return {
        props: {
            product: respons.data
        }
    }
}