'use client'

import { setCookie } from "cookies-next"
import Link from "next/link"
import Image from "next/image"
import Background from "@/components/Background"
import InputFormSign from "@/components/InputFormSign"
import { useState } from "react"
import { getRinjaniCultureAPI } from "@/libs/api"
import Or from "@/components/Or"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"

const Page = () => {
  const router = useRouter()

  const [email, setEmail] = useState('muhfirdaus0805@gmail.com')
  const [password, setPassword] = useState('Muhfirdaus@123')

  const [isLoad, setIsLoad] = useState(false)

  const load = isLoad ?
    (
      <Loading />
    )
    : null

  const handleLogin = async (event) => {
    setIsLoad(true)
    event.preventDefault()

    try {
      const response = await getRinjaniCultureAPI('users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      const { acessToken, refreshToken } = data

      if (response.ok) {
        setCookie('accessToken', acessToken)
        setCookie('refreshToken', refreshToken)
        router.push('/')
        alert('login succfuless')
      } else {
        alert('login failed')
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  const onHandlerEmail = (event) => {
    setEmail(event.target.value)
  }

  const onHandlerPassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="grid md:grid-cols-3 h-screen">
      {load}
      <div className="md:col-span-2 md:w-1/2 m-auto">
        <div className="space-y-6">
          <Link href="/">
            {/* <Image src='logo.svg' width={150} height={10} alt="" /> */}
          </Link>
          <h1 className="text-5xl font-semibold font-sora text-green-700">Login</h1>
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <InputFormSign value={email} title={`Email`} type={`email`} placeholder={`Input Email`} method={onHandlerEmail} />
              <InputFormSign value={password} title={`Password`} type={`password`} placeholder={`Input Password`} method={onHandlerPassword} />
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <p>Remember me</p>
              </label>
              <Link href='/' className="font-semibold">Forgot Password?</Link>
            </div>
            <div>
              <button className="font-medium text-base w-full bg-green-500 hover:bg-green-600 h-10 transition rounded-lg text-white">Login</button>
            </div>
          </form>

          <Or />

          <div className="flex items-center space-x-2 justify-center">
            <Image src='/google.svg' width={28} height={28} alt="Google" />
            <p className="font-normal">
              Register with Google
            </p>
          </div>

          <p className="font-normal text-center">Don`t have an account ? <Link href="/register" className="font-semibold">Register</Link></p>
        </div>
      </div>
      <Background id_image={`image-login`} />
    </div>
  )
}

export default Page