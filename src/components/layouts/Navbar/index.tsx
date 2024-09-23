import { signIn, useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    const {data}: any = useSession()
    console.log(data)
    return (
        <div>
            <div className="flex justify-between px-8 w-full h-[50px] items-center">

                <Link href="/profile" className="">
                    <p className="flex flex-col">
                        <span>{data && data.user.email}</span>
                        <span>{data && data.user.fullname}</span>
                    </p>
                </Link>
                
                <ul className="md:flex gap-4 hidden">
                    <li>Home</li>
                    <li>About</li>
                    <li>Featur</li>
                    <li>Reward</li>
                </ul>

                <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 bg-red-500 text-white rounded-xl">
                        {
                            data ? (<button  onClick={() => signOut()} >Sigin Out</button>) :
                            (<button onClick={() => signIn()} >Sign In</button>)
                        }
                    </div>

                    <div>
                        {data?.user?.image && (
                            <Image className="rounded-full" src={data.user.image} width={30} height={30} alt={data.user.fullname} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar