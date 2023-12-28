'use client'

import Link from "next/link"
import Image from "next/image"
import Background from "@/components/Background"
import InputFormSign from "@/components/InputFormSign"
import SelectCountry from "@/components/SelectCountry"
import Or from "@/components/Or"
import { useState } from "react"
import { getRinjaniCultureAPI } from "@/libs/api"

const Page = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [messageError, setMessageError] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const errorInfo = messageError ?
    (
      <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 " role="alert">
        <span class="font-medium">Danger alert!</span> {messageError}.
      </div>
    )
    : null

  const successInfo = messageSuccess ?
    (
      <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200" role="alert">
        <span class="font-medium">Create Account Success! </span> {messageSuccess}
      </div>
    )
    : null


  const handlerRegister = async (event) => {
    event.preventDefault()
    setIsLoad(true)
    if (password !== confirmPassword) {
      setMessageError('Password not Match')
      setIsLoad(false)
      return
    }
    setMessageError('')
    setMessageSuccess('')
    const body = {
      name: username,
      email: email,
      country: country,
      password: password,
      confirmPassword: confirmPassword
    }
    try {
      const response = await getRinjaniCultureAPI('users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (response.ok) {
        setMessageSuccess(data.message)
      } else {
        setMessageError(data.errors)
      }
    } catch (error) {
      console.error('Error during register:', error);
    } finally {
      setIsLoad(false)
    }
  }

  const onHandlerUsername = (event) => {
    setUsername(event.target.value)
  }

  const onHandlerEmail = (event) => {
    setEmail(event.target.value)
  }

  const onHandlerCountry = (event) => {
    setCountry(event.target.value)
  }

  const onHandlerPassword = (event) => {
    setPassword(event.target.value)
  }

  const onHandlerConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }

  return (
    <div className="grid md:grid-cols-3 h-screen">
      <div className="md:col-span-2 ">
        <div className="space-y-6 max-w-2xl m-auto p-4">
          <Link href="/">
            <Image src={`https://utfs.io/f/874d963c-d788-4fd2-98c4-8c8305fbde37-1qwd.png`} width={150} height={10} alt="" style={{ width: '104px', height: 'auto' }} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-green-700">Register</h1>
          <form className="space-y-8" onSubmit={handlerRegister}>
            <div className="space-y-6">
              <InputFormSign title={'Name'} type={'text'} placeholder={`Input Name`} method={onHandlerUsername} />
              <InputFormSign title={'Email'} type={'email'} placeholder={`Input Email`} method={onHandlerEmail} />
              <SelectCountry method={onHandlerCountry} value={country} />
              <InputFormSign title={'Password'} type={`${showPassword ? 'text' : 'password'}`} placeholder={`Input Password`} method={onHandlerPassword} />
              <InputFormSign title={'Confirm Password'} type={`${showPassword ? 'text' : 'password'}`} placeholder={`Input Confirm Password`} method={onHandlerConfirmPassword} />
              {errorInfo}
              {successInfo}
              <div className="space-x-2 flex items-center">
                <label className="flex items-center space-x-2 select-none" htmlFor="show">
                  <input id="show" type="checkbox" className="h-4 w-4" onChange={() => setShowPassword(!showPassword)} />
                  <p>Show Password</p>
                </label>
              </div>
            </div>
            <div>
              <button className="font-medium text-base w-full bg-rinjaniVisitor-green hover:bg-green-800 h-10 transition rounded-lg text-white">
                {
                  isLoad ?
                    (
                      <div className="custom-loader mx-auto h-8 w-8"></div>
                    )
                    : ("Register")
                }
              </button>
            </div>
          </form>
          <Or />
          <p className="font-normal text-center">Already have an account ? <Link href="/login" className="font-semibold">Login</Link></p>
        </div>
      </div>
      <Background id_image={`image-register`} />
    </div>
  )
}

export default Page