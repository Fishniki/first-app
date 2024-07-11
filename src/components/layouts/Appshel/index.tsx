import React from "react"
import Navbar from "../Navbar"

type AppShellProps = {
    children: React.ReactNode
}
const AppShell = (props: AppShellProps) => {

    const {children} = props

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default AppShell