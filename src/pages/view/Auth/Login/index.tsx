import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LoginView = () => {

  const [loading, isLoading] = useState(false)
  const [error, setError] = useState("")
  const {push, query} = useRouter()
  const callbackUrl: any = query.callbackUrl || '/';

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setError("")
    isLoading(true)

    try{
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      })

      if(!res?.error) {
        isLoading(false)
        push(callbackUrl)
      }else{
        isLoading(false)
        setError("Email or password is incorrect")
      }
    }catch (e: any) {
      isLoading(false)
      setError("Email or password is incorrect")
    }

  }
  return (
    <div className='h-screen flex flex-col justify-center'>
        <div className={`w-[350px] mx-auto p-2 bg-red-400 border border-red-500 rounded-md  ${error === "" ? "hidden": "block"}`}>
          <p className='text-center font-semibold text-white text-[16]'>{error}</p>
        </div>
        <h1 className="text-center font-semibold my-5 text-5xl ">Login</h1>
        <div className="w-[350px] mx-auto border p-6 rounded-md border-black">
                <div className="my-5">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input className="border border-slate-400 rounded-sm focus:outline-none px-2 py-1" type="email" name="email" placeholder='Email' id="email" />
                        <input className="border border-slate-400 rounded-sm focus:outline-none px-2 py-1" type="password" name="password" placeholder="Password" id="password"/>
                        <button type='submit' className="bg-blue-500 text-white font-medium hover:bg-blue-600 border rounded-md border-slate-800">{loading ? "Loading..." : "Login"}</button>
                    </form>
                        <button onClick={() => signIn("google", {
                          callbackUrl,
                          redirect: false
                        })} className="bg-slate-500 mt-1 w-full text-white font-medium hover:bg-slate-600 border rounded-md border-slate-800">Sign In With Google</button>
                </div>
        </div>
            <p className="text-xs text-center mt-5">Belum punya akun? Register <Link className="text-blue-600" href="/auth/register">disini</Link></p>
    </div>
  )
}

export default LoginView
