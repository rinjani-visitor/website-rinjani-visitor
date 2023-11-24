'use client'

import { Password, Scroll, UserGear } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBarMenu = () => {
  const path = usePathname()
  
  return (
    <div className="space-y-6">
      <Link href={`/profile/edit_profile`} className={`flex items-center space-x-2 hover:text-[#32823A] ${path === '/profile/edit_profile' ? 'text-[#32823A] font-medium' : ''}`}>
        <UserGear weight="fill" size={28} className=""/>
        <p>Edit Profile</p>
      </Link>
      <Link href={`/profile/change_password`} className={`flex items-center space-x-2 hover:text-[#32823A] ${path === '/profile/change_password' ? 'text-[#32823A] font-medium' : ''}`}>
        <Password weight="fill" size={28} className=""/>
        <p>Change Password</p>
      </Link>
      <Link href={`/profile/my_orders`} className={`flex items-center space-x-2 hover:text-[#32823A] ${path === '/profile/my_orders' ? 'text-[#32823A] font-medium' : ''}`}>
        <Scroll weight="fill" size={28} className=""/>
        <p>My Orders</p>
      </Link>
    </div>
  )
}

export default SideBarMenu