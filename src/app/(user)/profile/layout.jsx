'use client'
import SideBarMenu from "@/components/profile/SideBarMenu"
import { usePathname } from "next/navigation"
import imagePotrait from '/public/assets/potrait.jpg'
import Image from "next/image"

const Layout = ({ children }) => {
  const path = usePathname();

  let title = ''

  path.includes('edit') ? title = 'Edit Profile'
    : path.includes('change') ? title = 'Change Password'
      : title = 'My Orders'

  let subTitle = ''
  path.includes('edit') ? subTitle = 'This is the information about you'
    : path.includes('change') ? subTitle = `Secure your account with good password combination`
      : subTitle = 'Your Orders History'

  return (
    <div className="container">
      <div className="text-center mb-16">
        <h1 className="font-semibold text-3xl text-[green]">{title}</h1>
        <p className="font-normal">{subTitle}</p>
      </div>
      <section className="grid grid-cols-3">
        <div>
          <div className="rounded-full aspect-square h-28 bg-white mb-6 overflow-hidden">
            <Image src={imagePotrait} width={200} height={200} alt='...' />
          </div>
          <h1 className="text-xl font-semibold">ChritinaLie20</h1>
          <p className="mb-10">Indonesia</p>
          <SideBarMenu />
        </div>
        {children}
      </section>

    </div>
  )
}

export default Layout