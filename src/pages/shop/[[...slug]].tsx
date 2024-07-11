import { useRouter } from "next/router"

const ShopPage = () => {

    const {query} = useRouter()
    console.log(query)

    return (
        <div>
            <div>Shop Page</div>
            <p>Shop : {`${query.slug && query.slug[0]}`}</p>
            <p>Keterangan: {`${query.slug ? query.slug[0]: "Data Kosong"}`}</p>
            <p>Keterangan2: {query.slug ? query.slug.join(', ') : "Data Kosong"}</p>
            <p className="">
                shop 1: {`${query.slug && query.slug[0]}`}
                shop 2: {`${query.slug && query.slug[1]}`}
                shop 3: {`${query.slug && query.slug[2]}`}
            </p>
        </div>
    )
}

export default ShopPage