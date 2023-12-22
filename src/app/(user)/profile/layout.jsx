'use client'
import SideBarMenu from "@/components/profile/SideBarMenu"
import { usePathname } from "next/navigation"

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
    <div className="container mb-10">
      <div className="text-center mb-16">
        <h1 className="font-semibold text-3xl text-[green]">{title}</h1>
        <p className="font-normal">{subTitle}</p>
      </div>
      <section className="grid grid-cols-3">
        <div>
          <SideBarMenu />
        </div>
        {children}
      </section>

    </div>
  )
}

export default Layout