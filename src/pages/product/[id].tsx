import { useRouter } from 'next/router'
import React from 'react'

const UserProduct: React.FC = () => {

    const router = useRouter()
    console.log(router)

    const {query} = router


  return (
    <div>
        <div>Product Pages</div>
        <div>Belanja : {query.id}</div>
    </div>

  )
}

export default UserProduct