'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LoginRegisterButton from "./LoginRegisterButton"
import IsLogin from "./IsLogin"

import imageUrl from '/public/logo.svg';
import SearchInput from "./SearchInput"

const Navbar = () => {
  const path = usePathname()
  const isLoginRegister = path === '/login' || path === '/register'

  const [isLogin, setIsLogin] = useState(true)

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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
          <Image priority={true} src={imageUrl} width={300} height={200} style={{ width: '104px', height: 'auto' }} alt='Logo Rinjani Culutre' className="h-auto aspect-auto" />
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
            {/* search input */}
            <SearchInput />
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