import Email from 'next-auth/providers/email'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const RegisterView = () => {

  const [loading, isLoading] = useState(false)
  const [error, setError] = useState("")
  const {push} = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setError("")
    isLoading(true)
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value
    }

    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if(result.status === 200) {
      event.target.reset()
      isLoading(false)
      push('/auth/login')
    }else{
      isLoading(false)
      setError(result.status === 400 ? "Email Sudah Terdaftar" : "Server Error")
    }

  }
  return (
    <div className='h-screen flex flex-col justify-center'>
        <div className={`w-[350px] mx-auto p-2 bg-red-400 border border-red-500 rounded-md  ${error === "" ? "hidden": "block"}`}>
          <p className='text-center font-semibold text-white text-[16]'>{error}</p>
        </div>
        <h1 className="text-center font-semibold my-5 text-5xl ">Register</h1>
        <div className="w-[350px] mx-auto border p-6 rounded-md border-black">
                <div className="my-5">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input className="border border-slate-400 rounded-sm focus:outline-none px-2 py-1" type="text" name="fullname" placeholder='FullName' id="" />
                        <input className="border border-slate-400 rounded-sm focus:outline-none px-2 py-1" type="email" name="email" placeholder='Email' id="" />
                        <input className="border border-slate-400 rounded-sm focus:outline-none px-2 py-1" type="password" name="password" placeholder="Password" id="" />
                        <button type='submit' className="bg-blue-500 text-white font-medium hover:bg-blue-600 border rounded-md border-slate-800">{loading ? "Loading..." : "Register"}</button>
                    </form>
                </div>
        </div>
            <p className="text-xs text-center mt-5">Sudah punya akun? Login <Link className="text-blue-600" href="/auth/login">disini</Link></p>
    </div>
  )
}

export default RegisterView
