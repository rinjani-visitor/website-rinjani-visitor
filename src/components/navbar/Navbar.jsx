'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LoginRegisterButton from "./LoginRegisterButton"
import IsLogin from "./IsLogin"

import { List, X } from "@phosphor-icons/react"
import SearchInput from "./SearchInput"
import { getCookie } from "cookies-next"

const Navbar = () => {
  const path = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [scrolling, setScrolling] = useState(false);
  const [token, setToken] = useState(getCookie('accessToken'));

  const getToken = () => setToken(getCookie('accessToken'))

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

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
    <nav className={`${scrolling ? 'bg-nav' : 'bg-transparent'} mb-4 h-20 z-40 text-sm shadow sticky top-0 transition-all duration-500`} >
      <div className='container md:space-x-8 flex items-center h-full justify-between'>
        <Link href="/">
          <Image priority={true} src={`https://utfs.io/f/874d963c-d788-4fd2-98c4-8c8305fbde37-1qwd.png`} width={300} height={200} style={{ width: '104px', height: 'auto' }} alt='Logo Rinjani Culutre' className="h-auto aspect-auto" />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-green-700 transition md:hidden flex">
          {
            isOpen ?
              <X size={32} />
              : <List size={32} />
          }
        </button>
        <div className={`md:static md:flex md:flex-1 justify-between items-center transition ease-in-out ${!isOpen ? 'absolute left-0 -top-60' : 'absolute top-20 left-0 w-full'}`}>
          <ul className={`flex md:flex-row flex-col font-medium md:space-x-5`}>
            <li className={`text-green-500 hover:text-green-700 link ${path === '/' ? 'active_link text-green-700 font-bold' : ''} group `}>
              <Link href={`/`}>
                Home
              </Link>
              <div className="rounded-full underline group-hover:w-full group-hover:bg-[green]"></div>
            </li>
            {[
              ['Package', '/packages', 'package'],
              ['Home Stay', '/homestay', 'homestay'],
              ['Event', '/event', 'event'],
              ['Wish List', '/wishlist', 'wishlist'],
            ].map(([title, url, id]) => (
              <li key={id} className={`text-green-500 hover:text-green-700 link ${path.includes(id) ? 'active_link text-green-700 font-bold' : ''} group `}>
                <Link href={url}>
                  {title}
                </Link>
                <div className="rounded-full underline group-hover:w-full group-hover:bg-[green]"></div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row items-center space-x-4">
            {/* search input */}
            <SearchInput />
            {
              isLogin ?
                <IsLogin logoutCallBack={getToken} />
                : <LoginRegisterButton />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar