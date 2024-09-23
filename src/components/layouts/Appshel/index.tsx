import React from "react"
import { useRouter } from "next/router"
import { Roboto } from "next/font/google"
import dynamic from "next/dynamic"

//navbar dynamic components
const Navbar = dynamic(() => import('@/components/layouts/Navbar'))

type AppShellProps = {
    children: React.ReactNode
}

const roboto = Roboto({
    subsets: ["latin"],
    weight: '400',
})

const disableNavbar = ["/shop", "/product", "/404", "/auth/login", "/auth/register"]

const AppShell = (props: AppShellProps) => {

    const {children} = props
    const {pathname} = useRouter()

    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar/>}
            {children}
        </main >
    )
}

export default AppShell