import React, { useState } from 'react'
import InputFormSign from '../InputFormSign'
import axios from 'axios'
import getBaseURL from '@/libs/getBaseURL'

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handlerModal = () => {
    setEmail('')
    setIsOpen(!isOpen)
  }

  const handlerEmail = (event) => {
    setEmail(event.target.value)
  }

  const submitForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(getBaseURL('users/forgot-password'),
        {
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const { data } = response

      console.log(data);

      console.log('Response:', response);
      setIsOpen(false)

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <p onClick={handlerModal} className='cursor-pointer font-normal'>Forgot Password</p>
      <div className={`top-0 left-0 transition-all absolute w-full h-full min-h-screen bg-[#232323]/50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-500 flex justify-center items-center`}>
        <div className='bg-white w-2xl px-6 py-4 rounded-md space-y-4'>
          <h1 className='text-2xl text-slate-700 font-semibold text-center'>Input Your Email to Receive a <br /> New Password for Login</h1>
          <InputFormSign title={'Email'} type={'email'} placeholder={'Input Email'} method={handlerEmail} value={email} />
          <div className='mt-4 w-fit space-x-2 ml-auto justify-between flex'>
            <button onClick={handlerModal} type='button' className='py-2 px-3 bg-red-300 rounded'>Cancel</button>
            <button type='button' onClick={submitForgotPassword} className='py-2 px-3 bg-green-500 rounded'>Submit</button>
          </div>
        </div>
      </div>
    </ >
  )
}

export default ForgotPassword