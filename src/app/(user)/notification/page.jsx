'use client'

import Test from "@/components/Test"
import { getCookie } from "cookies-next"

const Page = () => {
  // const tokens = getCookie('accessToken')
  // console.log(tokens);

  let token
  try {
    token = getCookie('accessToken')
  } catch (error) {
    throw new error
  }

  console.log(token);

  return (
    <div className="container">
      <div className="text-center mb-16">
        <h1 className="font-semibold text-3xl text-[green]">Notification</h1>
        <p className="font-normal">Heres yout update</p>
        <Test token={token}/>
      </div>
      <div className="border border-slate-800 w-2/3 mx-auto">notif</div>
    </div>
  )
}

export default Page