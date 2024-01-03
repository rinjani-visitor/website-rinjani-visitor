"use client"

import InputFormSign from "@/components/InputFormSign"
import getBaseURL from "@/libs/getBaseURL"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toast'

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [name, setName] = useState('')

  const [message, setMessage] = useState('')

  const info = message ?
    (
      <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
        <span class="font-medium">{message}</span>
      </div>
    ) : null

  const requestDelete = async (event) => {
    setIsLoading(true)
    event.preventDefault()
    const body = {
      email: email,
      subject: 'Request Delete Account',
      message: reason,
      name: name
    }

    try {
      const response = await fetch(getBaseURL('send-message'), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setMessage('Your request has been sent, waiting for admin response');
      } else {
        throw new Error(`Failed to request`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center h-screen justify-center bg-slate-50">
      <ToastContainer delay={5000} />
      <form className="max-w-lg w-full shadow-md rounded-md p-4 grid space-y-4 bg-white" onSubmit={requestDelete}>
        <h1 className="text-center font-semibold text-xl text-rinjaniVisitor-green">Request to Delete Your Account</h1>
        <p className="before:content-['*'] text-slate-400">if you want to delete your account, please be aware of your order, booking, payment and review history will be deleted</p>
        <InputFormSign title={`Email`} type={`email`} placeholder={`jhondoe@gmail.com`} method={(event) => setEmail(event.target.value)} />
        <InputFormSign title={`Name`} type={`text`} placeholder={`Jhon Doe`} method={(event) => setName(event.target.value)} />
        <InputFormSign title={`Reason`} type={`text`} placeholder={`Your reason to delete account`} method={(event) => setReason(event.target.value)} />
        {info}
        <button disabled={isLoading} type="submit" className="bg-rinjaniVisitor-green ms-auto w-full text-white px-3 py-2 rounded-md">
          {
            isLoading ? (
              <div className="custom-loader mx-auto h-6 w-6"></div>
            ) : "Submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Page