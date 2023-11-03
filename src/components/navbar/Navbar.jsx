'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MagnifyingGlass } from "@phosphor-icons/react"
import LoginRegisterButton from "./LoginRegisterButton"
import IsLogin from "./IsLogin"

const Navbar = () => {
  const path = usePathname()
  const isLoginRegister = path === '/login' || path === '/register'

  const [isLogin, setIsLogin] = useState(false)

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${scrolling ? 'bg-nav' : 'bg-transparent'} mb-4 h-20 z-40 text-sm shadow sticky top-0 transition-all duration-500 ${isLoginRegister ? 'hidden' : ''}`} >
      <div className='container space-x-8 flex items-center h-full justify-between'>
        <Link href="/">
          <Image src="logo.svg" width={100} height={20} alt='Logo Rinjani Culutre' />
        </Link>
        <div className='flex flex-1 justify-between items-center'>
          <ul className='flex font-medium md:space-x-5'>
            {[
              ['Home', '/', 'home'],
              ['Package', '/packages', 'package'],
              ['Home Stay', '/homestay', 'homestay'],
              ['Event', '/event', 'event'],
              ['Wish List', '/wishlist', 'wishlist'],
            ].map(([title, url, id]) => (
              <li key={id} className={`text-green-500 hover:text-green-700 link ${path === url ? 'active_link text-green-700' : ''} group `}>
                <Link href={url}>
                  {title}
                </Link>
                <div className="rounded-full underline group-hover:w-full group-hover:bg-[green]"></div>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2.5 bg-[#DBFFDE] "><MagnifyingGlass weight="bold" size={24} color="green" /></button>
            {
              isLogin ?
                <IsLogin />
                : <LoginRegisterButton />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar