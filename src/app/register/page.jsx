'use client'

import Link from "next/link"
import Image from "next/image"
import Background from "@/components/Background"
import InputFormSign from "@/components/InputFormSign"
import SelectCountry from "@/components/SelectCountry"
import Or from "@/components/Or"

const Page = () => {

  return (
    <div className="grid md:grid-cols-3 h-screen">
      <div className="md:col-span-2 md:w-1/2 m-auto">
        <div className="space-y-6">
          <Link href="/">
            {/* <Image src='logo.svg' width={70} height={20} alt="" className="aspect-video"/> */}
          </Link>
          <h1 className="text-4xl font-semibold font-sora text-green-700">Register</h1>
          <form action="" className="space-y-8">
            <div className="space-y-6">
              <InputFormSign title={'Username'} type={'text'} />
              <InputFormSign title={'Email'} type={'email'} />
              <SelectCountry />
              <InputFormSign title={'Password'} type={'password'} />
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