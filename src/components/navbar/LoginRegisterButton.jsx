'use client'

import Link from "next/link"

const LoginRegisterButton = () => {
  return (
    <div className='flex md:flex-row flex-col md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto'>
      <Link href='/login' className='px-5 h-10 text-center border-2 md:w-24 items-center justify-center flex text-green-600 font-semibold rounded-md border-rinjaniVisitor-green'>
        Login
      </Link>
      <Link href='/register' className='bg-rinjaniVisitor-green text-white px-5 md:w-24 h-10 items-center justify-center flex rounded-md'>
        Register
      </Link>
    </div>
  )
}

export default LoginRegisterButton