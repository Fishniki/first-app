import { useEffect, useState } from "react"
import ProductViewPage from "../view/product"
import useSWR from "swr"
import { fetcher } from "@/utils/fetcher/fetcher"
import { useRouter } from "next/router"


const ProductPage = () => {
    const [dataApi, setDataApi] = useState([])
    const [isLogin, setIsLogin] = useState(true)
    const {push} = useRouter()

    useEffect(() => {
        if(!isLogin) {
            push('/auth/login')
        }
    }, [])

    // fetcher di ambil dari components utils/fetcher
    const {data, error, isLoading} = useSWR('/api/product', fetcher)
    console.log(data)

    // useEffect(() => {
    //     fetch("/api/product") 
    //         .then((res) => res.json())
    //         .then((respons) => setData(respons.data))
    // }, [])
    return (

        

        <div>
            <ProductViewPage data = {isLoading ? {} : data.data} />
        </div>
    )
}

export default ProductPage