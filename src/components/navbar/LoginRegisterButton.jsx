import Link from "next/link"

const LoginRegisterButton = () => {
  return (
    <div className='flex items-center space-x-4'>
      <Link href='/login' className='px-5 h-10 items-center flex text-green-600 font-semibold'>
        Login
      </Link>
      <Link href='/register' className='bg-green-600 text-white px-5 h-10 items-center flex rounded-[5px]'>
        Register
      </Link>
    </div>
  )
}

export default LoginRegisterButton