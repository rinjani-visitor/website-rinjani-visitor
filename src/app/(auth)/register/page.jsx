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
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  console.log(country);

  const handlerRegister = async (event) => {
    event.preventDefault()
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

      console.log(response);

      if (response.ok) {
        alert('succes')
      } else {
        alert(`register failed: ${response.message}`)
      }
    } catch (error) {
      console.error('Error during register:', error);
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
      <div className="md:col-span-2 md:w-1/2 m-auto">
        <div className="space-y-6 py-4">
          <Link href="/">
            <Image src={`https://utfs.io/f/874d963c-d788-4fd2-98c4-8c8305fbde37-1qwd.png`} width={150} height={10} alt="" style={{ width: '104px', height: 'auto' }} />
          </Link>
          <h1 className="text-4xl font-semibold font-sora text-green-700">Register</h1>
          <form className="space-y-8" onSubmit={handlerRegister}>
            <div className="space-y-6">
              <InputFormSign title={'Name'} type={'text'} placeholder={`Input Name`} method={onHandlerUsername} />
              <InputFormSign title={'Email'} type={'email'} placeholder={`Input Email`} method={onHandlerEmail} />
              <SelectCountry method={onHandlerCountry} value={country} />
              <InputFormSign title={'Password'} type={'password'} placeholder={`Input Password`} method={onHandlerPassword} />
              <InputFormSign title={'Confirm Password'} type={'password'} placeholder={`Input Confirm Password`} method={onHandlerConfirmPassword} />
              {/* <InputFormSign title={'Confirm Password'} type={'password'} placeholder={`Input Confirm Password`} /> */}
            </div>
            <div>
              <button className="font-medium text-base w-full bg-green-500 hover:bg-green-600 h-10 transition rounded-lg text-white">Register</button>
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