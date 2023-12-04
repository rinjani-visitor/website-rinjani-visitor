'use client'

import Link from "next/link"
import Image from "next/image"
import Background from "@/components/Background"
import InputFormSign from "@/components/InputFormSign"
import { useState } from "react"
import { getRinjaniCultureAPI } from "@/libs/api"
import Or from "@/components/Or"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"
import { getCookie, setCookie } from "cookies-next"
import ForgotPassword from "@/components/auth/ForgotPassword"

const Page = () => {
  const router = useRouter()

  const [email, setEmail] = useState('shafa.asyari.02@gmail.com')
  const [password, setPassword] = useState('N2348n23DP6q')
  const [messageError, setMessageError] = useState(null)
  const [isLoad, setIsLoad] = useState(false)

  const errorInfo = messageError ? (
    <p className="text-red-500 font-medium text-base">{messageError}</p>
  )
    : null

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
      console.log(data);
      const { accessToken, refreshToken } = data

      if (response.ok) {
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', refreshToken)
        router.push('/')
      } else {
        setMessageError(data.errors)
        // alert(data.errors)
        setIsLoad(false)
        return
      }
    } catch (error) {
      console.error('Error during login:', error);
      return
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
      <div className="md:col-span-2 my-auto">
        <div className="space-y-6 max-w-2xl mx-auto p-4">
          <Link href="/">
            <Image src={`https://utfs.io/f/874d963c-d788-4fd2-98c4-8c8305fbde37-1qwd.png`} width={150} height={10} alt="" style={{ width: '104px', height: 'auto' }} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-green-700">Login</h1>
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <InputFormSign value={email} title={`Email`} type={`email`} placeholder={`Input Email`} method={onHandlerEmail} />
              <InputFormSign value={password} title={`Password`} type={`password`} placeholder={`Input Password`} method={onHandlerPassword} />
              {errorInfo}
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <p>Remember me</p>
              </label>
              <ForgotPassword />
              {/* <Link href='/' className="font-semibold">Forgot Password?</Link> */}
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