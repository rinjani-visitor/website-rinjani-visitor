import React, { useState } from 'react'
import InputFormSign from '../InputFormSign'
import getBaseURL from '@/libs/getBaseURL'
import { ToastContainer, toast } from 'react-toast'

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoad, setIsLoad] = useState(false)

  const errorInfo = errorMessage.includes("User not found") ? (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{errorMessage}</span>
    </div>
  ) : errorMessage.includes("Forgot Password success, please check your email") ? (
    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span className="font-medium">{errorMessage}</span>
    </div>
  ) : null

  const handlerModal = () => {
    setEmail('')
    setIsOpen(!isOpen)
    setErrorMessage('')
  }

  const handlerEmail = (event) => {
    setEmail(event.target.value)
  }

  const submitForgotPassword = async (event) => {
    setIsLoad(true)
    event.preventDefault();

    try {
      const response = await fetch(getBaseURL('users/forgot-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(data.message)
      } else {
        setErrorMessage(data.errors)
      }

      setIsLoad(false)
    } catch (error) {
      toast.error(error.message);
      console.log("Error:", error);
    }
  };

  return (
    <>
      <p onClick={handlerModal} className='cursor-pointer font-normal'>Forgot Password</p>
      <div className={`top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} absolute transition-opacity duration-300`}>
        <ToastContainer delay={5000} />
        <div className='bg-white max-w-lg w-full px-6 py-4 rounded-md space-y-4 content-center'>
          <h1 className='text-2xl text-slate-700 font-semibold text-center'>Input Your Email to Receive a New Password for Login</h1>
          <InputFormSign type={'email'} placeholder={'Input Email'} method={handlerEmail} value={email} />
          {errorInfo}
          <div className='mt-4 w-fit space-x-3 ml-auto justify-between flex'>
            <button onClick={handlerModal} type='button' className='py-2 px-6 w-32 rounded-md border-2 border-red-600 text-red-600'>Cancel</button>
            <button type='submit' onClick={submitForgotPassword} className='py-2 px-6 w-32 text-white hover:bg-rinjaniVisitor-green bg-rinjaniVisitor-green/80 rounded-md'>
              {isLoad ? (
                <div className="custom-loader w-6 h-6 mx-auto"></div>
              ) : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </ >
  )
}

export default ForgotPassword