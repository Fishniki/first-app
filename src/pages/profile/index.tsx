import { useSession } from "next-auth/react"

const ProfilePage = () => {
    const {data}: any = useSession()
    return(
        <div>
            <h1>Profile</h1>
            <div>{data && data.user.email}</div>
        </div>
    )
}

export default ProfilePage