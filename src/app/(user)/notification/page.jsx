'use client'
import { hasCookie } from "cookies-next"
import NotifCard from "@/components/notif/NotifCard"

const Page = () => {
  const cookie = hasCookie('access')
  console.log(cookie);
  return (
    <div className="">
      <div className="mb-12 text-center">
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="font-semibold text-3xl text-[green]">Notification</h1>
            <p className="font-normal">Heres yout update</p>
          </div>
          <div className="p-4 space-y-4">
            <NotifCard />
            <NotifCard />
            <NotifCard />
          </div>
        </div >
      </div>
    </div>
  )
}

export default Page