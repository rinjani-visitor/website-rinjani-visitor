'use client'

import CardNotif from "@/components/notification/CardNotif"
import { hasCookie } from "cookies-next"

const Page = () => {
  const cookie = hasCookie('access')
  console.log(cookie);
  return (
    <div className="">
      <div className="mb-12 text-center">
        <h1 className="font-semibold text-3xl text-[green]">Notification</h1>
        <p className="font-normal">Heres yout update</p>
      </div>
      <CardNotif />
    </div>
  )
}

export default Page